#-------------------------------------------------------------------------------------------------------------------------
# Digits ⟷ Index
#-------------------------------------------------------------------------------------------------------------------------
"""
    index(dgt::AbstractVector{<:Integer})

Digit ⟹ index. 

The method compute the polynomial

number = bits[i] * base^(L-i) + 1

in the most efficient way.
"""
function index(dgt::AbstractVector{<:Integer}; base::Integer=2)
    N::Int = 0
    for i = 1:length(dgt)
        N = muladd(base, N, dgt[i])
    end
    N + 1
end

function index(dgt::AbstractVector{<:Integer}, sites::AbstractVector{<:Integer}; base::Integer=2)
    N::Int = 0
    for i in sites
        N = muladd(base, N, dgt[i])
    end
    N + 1
end

"""
    change!(dgt::Digit, index::Integer)

Index ⟹ Digit. 

The method compute the bits vector and write to bits.
"""
function change!(dgt::AbstractVector{<:Integer}, ind::Integer; base::Integer=2)
    N = ind - 1
    for i = length(dgt):-1:1
        N, dgt[i] = divrem(N, base)
    end
end

function change!(dgt::AbstractVector{<:Integer}, sites::AbstractVector{<:Integer}, ind::Integer; base::Integer=2)
    N = ind - 1
    for i = length(sites):-1:1
        N, dgt[sites[i]] = divrem(N, base)
    end
end

#-------------------------------------------------------------------------------------------------------------------------
# Search index
#-------------------------------------------------------------------------------------------------------------------------
"""
    binary_search(list::AbstractVector{<:Integer}, i<:Integer)

Return the position of i in a sorted list using binary search algorithm.
"""
function binary_search(list::AbstractVector{<:Integer}, i::Integer)
    l::Int = 1
    r::Int = length(list)
    c::Int = (l + r) ÷ 2
    while true
        t = list[c]
        (i < t) ? (r = c - 1) : (i > t) ? (l = c + 1) : break
        (l > r) ? (c = 0; break) : (c = (l + r) ÷ 2)
    end
    c
end

#-------------------------------------------------------------------------------------------------------------------------
# Shape-related functions
#-------------------------------------------------------------------------------------------------------------------------
function complement(Ainds::AbstractVector{<:Integer}, L::Integer)
    Binds = Vector{Int}(undef, L-length(Ainds))
    P::Int = 1
    for i = 1:L
        if !in(i, Ainds)
            Binds[P] = i
            P += 1
        end
    end
    Binds
end

function perm_element!(
    target::AbstractVector, dgt::AbstractVector{<:Integer}, val::Number, 
    Ainds::AbstractVector{<:Integer}, Binds::AbstractVector{<:Integer}, base::Integer
)
    ia = index(dgt, Ainds, base=base)
    ib = index(dgt, Binds, base=base)
    target[ia, ib] = val
end

#-------------------------------------------------------------------------------------------------------------------------
# Translation
#-------------------------------------------------------------------------------------------------------------------------
function cyclebits!(dgt::AbstractVector{<:Integer})
    p = dgt[end]
    for i = length(dgt):-1:2
        dgt[i] = dgt[i-1]
    end
    dgt[1] = p
    dgt
end

function translation_check(dgt::AbstractVector{<:Integer}, I0::Integer, base::Integer)::Tuple{Bool, Int}
    cyclebits!(dgt)
    for i=1:length(dgt)-1
        if (In = index(dgt, base=base)) < I0
            change!(dgt, I0, base=base)
            return (false, 0)
        elseif In == I0
            return (true, i)
        end
        cyclebits!(dgt)
    end
    return (true, length(dgt))
end

function translation_index(dgt::AbstractVector{<:Integer}, base::Integer)::Tuple{Int, Int}
    I0 = index(dgt, base=base)
    Im::Int = I0
    T::Int = 0
    cyclebits!(dgt)
    for i=1:length(dgt)-1
        if (In = index(dgt, base=base)) == I0
            break
        elseif In < Im
            Im, T = In, i
        end
        cyclebits!(dgt)
    end
    Im, T
end
