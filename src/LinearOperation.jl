#-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
# Fill Matrix
#-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export addto!
function addto!(M::AbstractMatrix, opt::Operator)
    for j = 1:size(opt.B, 2)
        colmn!(view(M, :, j), opt, j)
    end
    M
end
#-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
# Cnvert to dense array
#-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function Array(opt::Operator)
    M = zeros(eltype(opt), size(opt))
    if size(M, 1) > 0 && size(M, 2) > 0
        addto!(M, opt)
    end
    M
end

#-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
# Multiplication
#-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function mul!(target::AbstractVector, opt::Operator, v::AbstractVector)
    for j = 1:length(v)
        colmn!(target, opt, j, v[j])
    end
    target
end
function mul!(target::AbstractMatrix, opt::Operator, m::AbstractMatrix)
    for j = 1:size(m, 1)
        colmn!(target, opt, j, view(m, j, :))
    end
    target
end
#-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function *(opt::Operator, v::AbstractVector)
    ctype = promote_type(eltype(opt), eltype(vom))
    M = zeros(ctype, size(opt, 1))
    mul!(M, opt, v)
end
function *(opt::Operator, m::AbstractMatrix)
    ctype = promote_type(eltype(opt), eltype(vom))
    M = zeros(ctype, size(opt, 1), size(m, 2))
    mul!(M, opt, m)
end

#-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
# Helper Functions
#-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function colmn!(target::AbstractVector, M::SparseMatrixCSC, I::Vector{Int}, b::AbstractBasis, coeff::Number=1)
    rows, vals = rowvals(M), nonzeros(M)
    j = index(b.dgt, I, base=b.B)
    change = false
    for i in nzrange(M, j)
        row, val = rows[i], vals[i]
        change!(b.dgt, I, row, base=b.B)
        C, pos = index(b)
        target[pos] += coeff * C * val
        change = true
    end
    change ? change!(b.dgt, I, j, base=b.B) : nothing
end
#-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function colmn!(target::AbstractVector, opt::Operator, j::Integer, coeff::Number=1)
    b, M, I = opt.B, opt.M, opt.I
    C = coeff / change!(b, j)
    for i = 1:length(M)
        colmn!(target, M[i], I[i], b, C)
    end
end
#-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function colmn!(target::AbstractMatrix, M::SparseMatrixCSC, I::Vector{Int}, b::AbstractBasis, coeff::AbstractVector{<:Number})
    rows, vals = rowvals(M), nonzeros(M)
    j = index(b.dgt, I, base=b.B)
    change = false
    for i in nzrange(M, j)
        row, val = rows[i], vals[i]
        change!(b.dgt, I, row, base=b.B)
        C, pos = index(b)
        target[pos, :] .+= (C * val) .* coeff
        change = true
    end
    change ? change!(b.dgt, I, j, base=b.B) : nothing
end
#-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function colmn!(target::AbstractMatrix, opt::Operator, j::Integer, coeff::AbstractVector{<:Number})
    b, M, I = opt.B, opt.M, opt.I
    N = change!(b, j) .* coeff
    for i = 1:length(M)
        colmn!(target, M[i], I[i], b, N)
    end
end
