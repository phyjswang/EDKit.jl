var documenterSearchIndex = {"docs":
[{"location":"basis/#Basis","page":"Basis","title":"Basis","text":"","category":"section"},{"location":"basis/","page":"Basis","title":"Basis","text":"In EDKit.jl, the fundamental objects are basis and operator. The AbstractBasis is the abstract type of basis. Currently there are 4 concrete basis:","category":"page"},{"location":"basis/","page":"Basis","title":"Basis","text":"TensorBasis: Ordinary basis without any symmetry.\nProjectedBasis: Basis for subspace that is spanned only by product states.\nTranslationalBasis: Basis for translational symmetric Hamiltonian.\nTranslationalParityBasis : Basis with translational as well as reflection symmetry. The momensum should be 0 or π.","category":"page"},{"location":"basis/","page":"Basis","title":"Basis","text":"The basis object can be extended. To construct linear operation, we need to define 3 functions for a new basis type:","category":"page"},{"location":"basis/","page":"Basis","title":"Basis","text":"size(b::AbstractBasis) : Size of matrix representations of the operators in this subspace.\nchange!(b::AbstractBasis, i::Integer) : Return the normalization of ith state and change the digits to ith states in this subspace.\nindex(b::AbstractBasis) : Return the coefficient and index of the digits.","category":"page"},{"location":"basis/","page":"Basis","title":"Basis","text":"Optionally, we can define eltype for a basis object (default is ComplexF64).","category":"page"},{"location":"basis/","page":"Basis","title":"Basis","text":"If the calculation is done on the entire Hilbert space, the basis object need not be explicitly constructed. The Operator will use TensorBasis by default. The construction of other basis with symmetry concern are discussed below.","category":"page"},{"location":"basis/","page":"Basis","title":"Basis","text":"In addition, if the entaglement entropy is needed, the user-defined basis should implement a function schmidt!(target, v, Ainds, b::AbstractBasis).","category":"page"},{"location":"basis/","page":"Basis","title":"Basis","text":"Here we introduce 3 concrete implementation of AbstractBasis.","category":"page"},{"location":"basis/#TensorBasis","page":"Basis","title":"TensorBasis","text":"","category":"section"},{"location":"basis/","page":"Basis","title":"Basis","text":"The type TensorBasis has the fields:","category":"page"},{"location":"basis/","page":"Basis","title":"Basis","text":"struct TensorBasis <: AbstractBasis\n    dgt::Vector{Int}\n    B::Int\nend","category":"page"},{"location":"basis/","page":"Basis","title":"Basis","text":"We can use the function","category":"page"},{"location":"basis/","page":"Basis","title":"Basis","text":"tensorbasis(L::Integer; base::Integer=2)","category":"page"},{"location":"basis/","page":"Basis","title":"Basis","text":"to construct a basis, though in most cases it is not necessary.","category":"page"},{"location":"basis/#ProjectedBasis","page":"Basis","title":"ProjectedBasis","text":"","category":"section"},{"location":"basis/","page":"Basis","title":"Basis","text":"The type ProjectedBasis has the fields:","category":"page"},{"location":"basis/","page":"Basis","title":"Basis","text":"struct ProjectedBasis <: AbstractBasis\n    dgt::Vector{Int}\n    I::Vector{Int}\n    B::Int\nend","category":"page"},{"location":"basis/","page":"Basis","title":"Basis","text":"We can use the function","category":"page"},{"location":"basis/","page":"Basis","title":"Basis","text":"projectedbasis(f, L::Integer; base::Integer=2)","category":"page"},{"location":"basis/","page":"Basis","title":"Basis","text":"In the definition, f is a function acting on digits that tells whether a given digits is valid in this basis. For eaxample, consider a S=1/2 chain with L=6 (conserve megnetic quantum number). If we consider the subspace spaned by those states with 3 up-spins, we can create the basis for the subspace by","category":"page"},{"location":"basis/","page":"Basis","title":"Basis","text":"projectedbasis(x -> sum(x)==3, 6; base=2)","category":"page"},{"location":"basis/#TranslationalBasis","page":"Basis","title":"TranslationalBasis","text":"","category":"section"},{"location":"basis/","page":"Basis","title":"Basis","text":"The type TranslationalBasis has the fields:","category":"page"},{"location":"basis/","page":"Basis","title":"Basis","text":"struct TranslationalBasis <: AbstractBasis\n    dgt::Vector{Int}\n    I::Vector{Int}\n    R::Vector{Float64}\n    C::ComplexF64\n    B::Int\nend","category":"page"},{"location":"basis/","page":"Basis","title":"Basis","text":"We can use the function","category":"page"},{"location":"basis/","page":"Basis","title":"Basis","text":"translationalbasis(k::Integer, L::Integer; base::Integer=2)\ntranslationalbasis(f, k::Integer, L::Integer; base::Integer=2)","category":"page"},{"location":"basis/","page":"Basis","title":"Basis","text":"In the definition, k is the momentum sector we are interested, and f is a function acting on digits that tells whether a given digits is valid in this basis. Note that k is an integer, representing the momentum at 2πk/L. For example, consider a S=1/2 chain with L=6 (with translational symmetry and conserve magnetic quantum number). If we consider the subspace spaned by those states with 3 up-spins with zero momentum, we can create the basis for the subspace by","category":"page"},{"location":"basis/","page":"Basis","title":"Basis","text":"translationalbasis(x -> sum(x)==3, 0, 6; base=2)","category":"page"},{"location":"expl/#XXZ-Model-with-Random-Field","page":"Examples","title":"XXZ Model with Random Field","text":"","category":"section"},{"location":"expl/","page":"Examples","title":"Examples","text":"Consider the Hamiltonian ","category":"page"},{"location":"expl/","page":"Examples","title":"Examples","text":"H = sum_ileft(sigma_i^x sigma^x_i+1 + sigma^y_isigma^y_i+1 + h_i sigma^z_isigma^z_i+1right)","category":"page"},{"location":"expl/","page":"Examples","title":"Examples","text":"We choose the system size to be L=10. The Hamiltonian need 3 generic information: ","category":"page"},{"location":"expl/","page":"Examples","title":"Examples","text":"Local operators represented by matrices;\nSite indices where each local operator acts on;\nBasis, if use the default tensor-product basis, only need to provide the system size.","category":"page"},{"location":"expl/","page":"Examples","title":"Examples","text":"The following script generate the information we need to generate XXZ Hamiltonian:","category":"page"},{"location":"expl/","page":"Examples","title":"Examples","text":"L = 10\nmats = [\n    fill(spin(\"XX\"), L);\n    fill(spin(\"YY\"), L);\n    [randn() * spin(\"ZZ\") for i=1:L]\n]\ninds = [\n    [[i, mod(i, L)+1] for i=1:L];\n    [[i, mod(i, L)+1] for i=1:L];\n    [[i, mod(i, L)+1] for i=1:L]\n]\nH = operator(mats, inds, L)","category":"page"},{"location":"expl/","page":"Examples","title":"Examples","text":"Then we can use the constructor operator to create Hamiltonian:","category":"page"},{"location":"expl/","page":"Examples","title":"Examples","text":"julia> H = operator(mats, inds, L)\nOperator of size (1024, 1024) with 10 terms.","category":"page"},{"location":"expl/","page":"Examples","title":"Examples","text":"The constructor return an Operator object, which is a linear operator that can act on vector/ matrix. For example, we can act H on the ferromagnetic state:","category":"page"},{"location":"expl/","page":"Examples","title":"Examples","text":"julia> ψ = zeros(2^L); ψ[1] = 1; H * random_state\n1024-element Vector{Float64}:\n -1.5539463277491536\n  5.969061189628827\n  3.439873269795492\n  1.6217619009059376\n  0.6101231697221667\n  6.663735992405236\n  ⋮\n  5.517409105968883\n  0.9498121684380652\n -0.0004996659995972763\n  2.6020967735388734\n  4.99027405325114\n -1.4831032210847952","category":"page"},{"location":"expl/","page":"Examples","title":"Examples","text":"If we need a matrix representation of the Hamitonian, we can convert H to julia array by:","category":"page"},{"location":"expl/","page":"Examples","title":"Examples","text":"julia> Array(H)\n1024×1024 Matrix{Float64}:\n -1.55617  0.0       0.0       0.0     …   0.0      0.0       0.0\n  0.0      4.18381   2.0       0.0         0.0      0.0       0.0\n  0.0      2.0      -1.42438   0.0         0.0      0.0       0.0\n  0.0      0.0       0.0      -1.5901      0.0      0.0       0.0\n  0.0      0.0       2.0       0.0         0.0      0.0       0.0\n  0.0      0.0       0.0       2.0     …   0.0      0.0       0.0\n  ⋮                                    ⋱                     \n  0.0      0.0       0.0       0.0         0.0      0.0       0.0\n  0.0      0.0       0.0       0.0         2.0      0.0       0.0\n  0.0      0.0       0.0       0.0     …   0.0      0.0       0.0\n  0.0      0.0       0.0       0.0        -1.42438  2.0       0.0\n  0.0      0.0       0.0       0.0         2.0      4.18381   0.0\n  0.0      0.0       0.0       0.0         0.0      0.0      -1.55617","category":"page"},{"location":"expl/","page":"Examples","title":"Examples","text":"Or use the function sparse to create the sparse matrix (requires the module SparseArrays being imported):","category":"page"},{"location":"expl/","page":"Examples","title":"Examples","text":"julia> sparse(H)\n1024×1024 SparseMatrixCSC{Float64, Int64} with 6144 stored entries:\n⠻⣦⣄⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠳⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n⠀⢹⡻⣮⡳⠄⢠⡀⠀⠀⠀⠀⠀⠀⠈⠳⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀\n⠀⠀⠙⠎⢿⣷⡀⠙⢦⡀⠀⠀⠀⠀⠀⠀⠈⠳⣄⠀⠀⠀⠀⠀⠀⠀\n⠀⠀⠀⠲⣄⠈⠻⣦⣄⠙⠀⠀⠀⢦⡀⠀⠀⠀⠈⠳⣄⠀⠀⠀⠀⠀\n⠀⠀⠀⠀⠈⠳⣄⠙⡻⣮⡳⡄⠀⠀⠙⢦⡀⠀⠀⠀⠈⠳⣄⠀⠀⠀\n⠀⠀⠀⠀⠀⠀⠀⠀⠙⠮⢻⣶⡄⠀⠀⠀⠙⢦⡀⠀⠀⠀⠈⠳⣄⠀\n⢤⡀⠀⠀⠀⠀⠠⣄⠀⠀⠀⠉⠛⣤⣀⠀⠀⠀⠙⠂⠀⠀⠀⠀⠈⠓\n⠀⠙⢦⡀⠀⠀⠀⠈⠳⣄⠀⠀⠀⠘⠿⣧⡲⣄⠀⠀⠀⠀⠀⠀⠀⠀\n⠀⠀⠀⠙⢦⡀⠀⠀⠀⠈⠳⣄⠀⠀⠘⢮⡻⣮⣄⠙⢦⡀⠀⠀⠀⠀\n⠀⠀⠀⠀⠀⠙⢦⡀⠀⠀⠀⠈⠳⠀⠀⠀⣄⠙⠻⣦⡀⠙⠦⠀⠀⠀\n⠀⠀⠀⠀⠀⠀⠀⠙⢦⡀⠀⠀⠀⠀⠀⠀⠈⠳⣄⠈⢿⣷⡰⣄⠀⠀\n⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢦⡀⠀⠀⠀⠀⠀⠀⠈⠃⠐⢮⡻⣮⣇⠀\n⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢦⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠙⠻⣦","category":"page"},{"location":"expl/#Solving-AKLT-Model-Using-Symmetries","page":"Examples","title":"Solving AKLT Model Using Symmetries","text":"","category":"section"},{"location":"expl/","page":"Examples","title":"Examples","text":"Consider the AKLT model ","category":"page"},{"location":"expl/","page":"Examples","title":"Examples","text":"H = sum_ileftvec S_i cdot vec S_i+1 + frac13left(vec S_i cdot vec S_i+1right)^2right","category":"page"},{"location":"expl/","page":"Examples","title":"Examples","text":"with system size chosen to be L=8. The Hamiltonian operator for this translational-invariant Hamiltonian can be constructed using the trans_inv_operator function:","category":"page"},{"location":"expl/","page":"Examples","title":"Examples","text":"L = 8\nSS = spin((1, \"xx\"), (1, \"yy\"), (1, \"zz\"), D=3)\nmat = SS + 1/3 * SS^2\nH = trans_inv_operator(mat, 1:2, L)","category":"page"},{"location":"expl/","page":"Examples","title":"Examples","text":"The second input specifies the indices the operators act on.","category":"page"},{"location":"expl/","page":"Examples","title":"Examples","text":"Because of the translational symmetry, we can simplify the problem by considering the symmetry. We construct a translational-symmetric basis by:","category":"page"},{"location":"expl/","page":"Examples","title":"Examples","text":"B = TranslationalBasis(L=8, k=8, base=3)","category":"page"},{"location":"expl/","page":"Examples","title":"Examples","text":"Here, L is the length of the system, and k labels the momentum k = 0L-1 (integer multiply of 2π/L). The function TranslationalBasis return a basis object containing 834 states. We can obtain the Hamiltonian in this sector by:","category":"page"},{"location":"expl/","page":"Examples","title":"Examples","text":"julia> H = trans_inv_operator(mat, 1:2, B)\nOperator of size (834, 834) with 8 terms.","category":"page"},{"location":"expl/","page":"Examples","title":"Examples","text":"In addition, we can take into account the total S^z conservation, by constructing the basis","category":"page"},{"location":"expl/","page":"Examples","title":"Examples","text":"B = TranslationalBasis(L=8, N=8, k=0, base=3)","category":"page"},{"location":"expl/","page":"Examples","title":"Examples","text":"where the N is the filling number with respect to all-spin-down state. N=L means we select those states whose total Sz equalls 0 (note that we use 0,1,2 to label the Sz=1,0,-1 states). This gives a further reduced Hamiltonian matrix:","category":"page"},{"location":"expl/","page":"Examples","title":"Examples","text":"julia> H = trans_inv_operator(mat, 1:2, B)\nOperator of size (142, 142) with 8 terms.","category":"page"},{"location":"expl/","page":"Examples","title":"Examples","text":"We can go on step further by considering the spatial reflection symmetry.","category":"page"},{"location":"expl/","page":"Examples","title":"Examples","text":"B = TranslationParityBasis(L=8, N=0, k=0, p=1, base=3)","category":"page"},{"location":"expl/","page":"Examples","title":"Examples","text":"where the p argument is the parity p = ±1.","category":"page"},{"location":"expl/","page":"Examples","title":"Examples","text":"julia> H = trans_inv_operator(mat, 1:2, B)\nOperator of size (84, 84) with 8 terms.","category":"page"},{"location":"expl/#PXP-Model-and-Entanglement-Entropy","page":"Examples","title":"PXP Model and Entanglement Entropy","text":"","category":"section"},{"location":"expl/","page":"Examples","title":"Examples","text":"Consider the PXP model","category":"page"},{"location":"expl/","page":"Examples","title":"Examples","text":"H = sum_i left(P^0_i-1 sigma^x_i P^0_i+1right)","category":"page"},{"location":"expl/","page":"Examples","title":"Examples","text":"Note that the model is defined on the Hilbert space where there is no local 11ranglerangle configuration. For system size L=20 and in sector k=0p=+1, the Hamiltonian is constructed by:","category":"page"},{"location":"expl/","page":"Examples","title":"Examples","text":"mat = begin\n    P = [1 0; 0 0]\n    kron(P, spin(\"X\"), P)\nend\npxpf(v::Vector{<:Integer}) = all(v[i]==0 || v[mod(i, length(v))+1]==0 for i=1:length(v))\nbasis = TranslationParityBasis(L=20, f=pxpf, k=0, p=1)\nH = trans_inv_operator(mat, 2, basis)","category":"page"},{"location":"expl/","page":"Examples","title":"Examples","text":"where f augument is the selection function for the basis state that can be user defined. We can then diagonalize the Hamiltonian. The bipartite entanglement entropy for each eigenstates can be computed by","category":"page"},{"location":"expl/","page":"Examples","title":"Examples","text":"vals, vecs = Array(H) |> Hermitian |> eigen\nEE = [ent_S(vecs[:,i], 1:L÷2, basis) for i=1:size(basis,1)]\nscatter(vals, EE, xlabel=\"E\",ylabel=\"S\",legend=false)","category":"page"},{"location":"expl/","page":"Examples","title":"Examples","text":"The plot is","category":"page"},{"location":"expl/","page":"Examples","title":"Examples","text":"(Image: )","category":"page"},{"location":"opts/","page":"Operator","title":"Operator","text":"In EDKit.jl , a many-body operator is represented by the type Operator:","category":"page"},{"location":"opts/","page":"Operator","title":"Operator","text":"struct Operator{Tv<:Number, Tb<:AbstractBasis}\n    M::Vector{SparseMatrixCSC{Tv, Int}}\n    I::Vector{Vector{Int}}\n    B::Tb\nend","category":"page"},{"location":"opts/","page":"Operator","title":"Operator","text":"In this definition, M is the list of matrix representations of local operators, I is the list of indices of sites it acts on.","category":"page"},{"location":"opts/#Construction","page":"Operator","title":"Construction","text":"","category":"section"},{"location":"opts/","page":"Operator","title":"Operator","text":"To construct an Operator object, we need 3 inputs M, I, and B, where M is the list of matrices representing the local operators, I is the list of vectors representing the sites it acts on. B is a basis object. If use TensorBasis, we can directly using the constructing method","category":"page"},{"location":"opts/","page":"Operator","title":"Operator","text":"operator(mats, inds, basis)","category":"page"},{"location":"opts/","page":"Operator","title":"Operator","text":"For translation invariant system we can also use the command","category":"page"},{"location":"opts/","page":"Operator","title":"Operator","text":"trans_inv_operator(mat, ind, basis)","category":"page"},{"location":"opts/","page":"Operator","title":"Operator","text":"Here mat is a single matrix, ind is the sites a single operator act on (e.g, ind=1:2 for nearest neighbor coupling translational invairant system).","category":"page"},{"location":"opts/#Convert-to-matrix","page":"Operator","title":"Convert to matrix","text":"","category":"section"},{"location":"opts/","page":"Operator","title":"Operator","text":"An Operator object is basically like a matrix, and it can be converted to dense matrix using the function","category":"page"},{"location":"opts/","page":"Operator","title":"Operator","text":"Array(opt::Operation)","category":"page"},{"location":"opts/","page":"Operator","title":"Operator","text":"Also, an Operator can be converted to a sparse matrix (the package SparseArrays should be inported beforehand)","category":"page"},{"location":"opts/","page":"Operator","title":"Operator","text":"sparse(opt::Operation)","category":"page"},{"location":"opts/","page":"Operator","title":"Operator","text":"It can also write to a given matrix with correct dimension using function","category":"page"},{"location":"opts/","page":"Operator","title":"Operator","text":"addto!(M::AbstractMatrix, opt::Operator)","category":"page"},{"location":"opts/","page":"Operator","title":"Operator","text":"Note that to get correct answer, M should de initialized as a zero matrix.","category":"page"},{"location":"opts/#Multiply-to-vector-or-matrix","page":"Operator","title":"Multiply to vector or matrix","text":"","category":"section"},{"location":"opts/","page":"Operator","title":"Operator","text":"We can directly using","category":"page"},{"location":"opts/","page":"Operator","title":"Operator","text":"O::Operator * M::AbstractVecOrMat","category":"page"},{"location":"opts/","page":"Operator","title":"Operator","text":"to do the multiplycation. Or, use the function","category":"page"},{"location":"opts/","page":"Operator","title":"Operator","text":"mul!(target::AbstractVecOrMat, opt::Operator, v::AbstractVecOrMat)","category":"page"},{"location":"opts/","page":"Operator","title":"Operator","text":"to modify target (similarly, target should be initialized as a zero vector/matrix).","category":"page"},{"location":"opts/#Compute-entaglement-entropy","page":"Operator","title":"Compute entaglement entropy","text":"","category":"section"},{"location":"opts/","page":"Operator","title":"Operator","text":"After obtaining Hamiltonian in a symmetry sector. We can calculate the entaglement entropy of an eigenvector v (assume the system size is 2L, and the entropy cut is at the middel of the chain) by","category":"page"},{"location":"opts/","page":"Operator","title":"Operator","text":"ent_S(v::AbstractVector, 1:L, b::AbstractBasis)","category":"page"},{"location":"#EDKit.jl","page":"Introduction","title":"EDKit.jl","text":"","category":"section"},{"location":"","page":"Introduction","title":"Introduction","text":"Julia package for general many-body exact diagonalization calculation for spin systems. ","category":"page"},{"location":"","page":"Introduction","title":"Introduction","text":"All information we need to specify a local operator in the many-body Hilbert space are:","category":"page"},{"location":"","page":"Introduction","title":"Introduction","text":"Matrix form of the local operators;\nIndices the local operator act on;\nBasis for the many-body operator.","category":"page"},{"location":"","page":"Introduction","title":"Introduction","text":"For example, the AKLT model (with size L=8)","category":"page"},{"location":"","page":"Introduction","title":"Introduction","text":"H = sum_i=1^8leftvecS_i cdot vecS_i+1 + frac13left(vecS_i cdot vecS_i+1right)^2right","category":"page"},{"location":"","page":"Introduction","title":"Introduction","text":"can be easyly constructed using the command:","category":"page"},{"location":"","page":"Introduction","title":"Introduction","text":"L = 8\nSS = spin((1, \"xx\"), (1, \"yy\"), (1, \"zz\"), D=3)\nmat = SS + 1/3 * SS^2\nH = trans_inv_operator(mat, 1:2, L)","category":"page"},{"location":"","page":"Introduction","title":"Introduction","text":"The EDKit.jl provide a general function operator(mats, inds, basis) which helps to create local operator. Especially when we are doing exact diagonalization calculation on a specific symmetry sector (e.g., sector with total S^z=0 and total momentum k=0). The functionalities can be extended with user-defined bases.","category":"page"},{"location":"#Installation","page":"Introduction","title":"Installation","text":"","category":"section"},{"location":"","page":"Introduction","title":"Introduction","text":"Run the following script in the Pkg REPL environment:","category":"page"},{"location":"","page":"Introduction","title":"Introduction","text":"pkg> add EDKit","category":"page"},{"location":"Lindblad/#Lindblad-Equation","page":"Master Equation","title":"Lindblad Equation","text":"","category":"section"},{"location":"Lindblad/","page":"Master Equation","title":"Master Equation","text":"The Lindblad master equation for Makovian open system is","category":"page"},{"location":"Lindblad/","page":"Master Equation","title":"Master Equation","text":"fracddt rho = -iH rho + sum_mu=1^m  L_mu rho  L_mu^dagger -frac12 sum_mu=1^m  L_mu^dagger  L_mu  rho","category":"page"},{"location":"Lindblad/","page":"Master Equation","title":"Master Equation","text":"The Lindblad super-operator is represented by object Lindblad:","category":"page"},{"location":"Lindblad/","page":"Master Equation","title":"Master Equation","text":"struct Lindblad{T1, T2}\n    H::Matrix{T1}\n    L::Vector{Matrix{T2}}\nend","category":"page"},{"location":"Lindblad/","page":"Master Equation","title":"Master Equation","text":"To create the object, simply use the command lindblad(H, L) where H is the Hamiltonian and L is the list of jump operators. The Lindblad operator act on the DensityMatrix object:","category":"page"},{"location":"Lindblad/","page":"Master Equation","title":"Master Equation","text":"struct DensityMatrix{T}\n    ρ::Matrix{T}\nend","category":"page"},{"location":"Lindblad/","page":"Master Equation","title":"Master Equation","text":"which is created by the following constructors:","category":"page"},{"location":"Lindblad/","page":"Master Equation","title":"Master Equation","text":"densitymatrix(ρ::AbstractArray) = DensityMatrix(ρ)\ndensitymatrix(ψ::AbstractVector) = DensityMatrix(ψ * ψ')\ndensitymatrix(i::Integer, L::Integer; base::Integer=2)","category":"page"},{"location":"Lindblad/","page":"Master Equation","title":"Master Equation","text":"Given a Lindblad super-operator and a density matrix, the time evolution is simulated by","category":"page"},{"location":"Lindblad/","page":"Master Equation","title":"Master Equation","text":"(lb::Lindblad)(dm::DensityMatrix, dt::Real=0.05; order::Integer=5)","category":"page"},{"location":"Lindblad/#Free-Fermion-Case","page":"Master Equation","title":"Free Fermion Case","text":"","category":"section"},{"location":"Lindblad/","page":"Master Equation","title":"Master Equation","text":"When the jump operators contain only the linear Majorana operators, the Lindblad equation preserve Gaussianity. For jump operator contains up to quadratic Majorana terms, the evolution will break the Gaussian form, however, the 2n-point correlation is still solvable for free fermion system. It is better to expressed the problem in Majorana operators rather than the ordinary fremion operators, the former is defined here as","category":"page"},{"location":"Lindblad/","page":"Master Equation","title":"Master Equation","text":"leftbeginarrayc omega_i  omega_i+N endarrayright\n= leftbeginarraycc \n\t1  1  \n\ti  -i \nendarrayright \nleftbeginarrayc \n\tc_i  c_i^dagger \nendarrayright","category":"page"},{"location":"Lindblad/","page":"Master Equation","title":"Master Equation","text":"A fermion bilinear of the form","category":"page"},{"location":"Lindblad/","page":"Master Equation","title":"Master Equation","text":" H_mathrmfree = sum_ij=1^N A_ij c_i^dagger c_j + frac12sum_ij=1^N B_ij c_i c_j + frac12sum_ij=1^N B_ij^* c_j^dagger c_i^dagger","category":"page"},{"location":"Lindblad/","page":"Master Equation","title":"Master Equation","text":"can be brought to Majorana form","category":"page"},{"location":"Lindblad/","page":"Master Equation","title":"Master Equation","text":" H_mathrmfree = -fraci4 sum_ij=1^2N H_ij omega_i omega_j","category":"page"},{"location":"Lindblad/","page":"Master Equation","title":"Master Equation","text":"where the single-body matrix H is a 2N * 2N real anti-symmetric matrix:","category":"page"},{"location":"Lindblad/","page":"Master Equation","title":"Master Equation","text":"\tH = leftbeginarraycc \n\t\t-A^I - B^I  A^R - B^R \n    \t-A^R - B^R   -A^I + B^I \n\tendarrayright","category":"page"},{"location":"Lindblad/","page":"Master Equation","title":"Master Equation","text":"This can be done using the function majoranaform(A::AbstractMatrix, B::AbstractMatrix).","category":"page"},{"location":"Lindblad/","page":"Master Equation","title":"Master Equation","text":"We assume that the jump operator has up to quadratic Majorana terms. In particular, we denote the linear terms and the Hermitian quadratic terms as","category":"page"},{"location":"Lindblad/","page":"Master Equation","title":"Master Equation","text":" L_r = sum_j=1^2N L^r_j omega_j quad  L_s = sum_jk=1^2N M^s_jk omega_j omega_k","category":"page"},{"location":"Lindblad/","page":"Master Equation","title":"Master Equation","text":"Consider the covariance matrix","category":"page"},{"location":"Lindblad/","page":"Master Equation","title":"Master Equation","text":"Gamma_ij = ilangle omega_i omega_jrangle","category":"page"},{"location":"Lindblad/","page":"Master Equation","title":"Master Equation","text":"its equation of motion is:","category":"page"},{"location":"Lindblad/","page":"Master Equation","title":"Master Equation","text":"partial_t Gamma = X^TcdotGamma + Gamma cdot X + sum_s (Z^s)^T cdot Gammacdot Z^s + Y","category":"page"},{"location":"Lindblad/","page":"Master Equation","title":"Master Equation","text":"where","category":"page"},{"location":"Lindblad/","page":"Master Equation","title":"Master Equation","text":"X = H - 2B^R + 8 sum_s (mathrmIm M^s)^2 quad Y = 4B^I quad Z = 4 mathrmIm M^s","category":"page"},{"location":"Lindblad/","page":"Master Equation","title":"Master Equation","text":"The Lindblad super-operator for this free fermion system is stored in the object","category":"page"},{"location":"Lindblad/","page":"Master Equation","title":"Master Equation","text":"struct QuardraticLindblad{T1 <: Real, T2 <: Real, T3 <: Real} \n    X::Matrix{T1}\n    Y::Matrix{T2}\n    Z::Vector{Matrix{T3}}\nend","category":"page"},{"location":"Lindblad/","page":"Master Equation","title":"Master Equation","text":"There are two constructors for the QuardraticLindblad:","category":"page"},{"location":"Lindblad/","page":"Master Equation","title":"Master Equation","text":"quadraticlindblad(H::AbstractMatrix, L::AbstractMatrix, M::AbstractVector{<:AbstractMatrix})\nquadraticlindblad(H::AbstractMatrix, L::AbstractMatrix)","category":"page"},{"location":"Lindblad/","page":"Master Equation","title":"Master Equation","text":"The QuardraticLindblad object act on the CovarianceMatrix object:","category":"page"},{"location":"Lindblad/","page":"Master Equation","title":"Master Equation","text":"struct CovarianceMatrix{T <: Real}\n    Γ::Matrix{T}\n    N::Integer\nend","category":"page"},{"location":"Lindblad/","page":"Master Equation","title":"Master Equation","text":"created by","category":"page"},{"location":"Lindblad/","page":"Master Equation","title":"Master Equation","text":"covariancematrix(Γ::AbstractMatrix{<:Real})\ncovariancematrix(n::AbstractVector{<:Integer})","category":"page"},{"location":"Lindblad/","page":"Master Equation","title":"Master Equation","text":"The evolution of the covariance matrix is simulated by the following command:","category":"page"},{"location":"Lindblad/","page":"Master Equation","title":"Master Equation","text":"(ql::QuardraticLindblad)(cm::CovarianceMatrix, dt::Real=0.05; order::Integer=5)","category":"page"}]
}
