module EDKit

using LinearAlgebra
using SparseArrays
#-----------------------------------------------------------------------------------------------------
import Base: +, -, *, /
import Base: eltype, view, length, size, append!
import Base: Array, Vector
import LinearAlgebra: norm, mul!
import SparseArrays: sparse
#-----------------------------------------------------------------------------------------------------
export change!, index, operator
const BITTYPE = UInt8
#-----------------------------------------------------------------------------------------------------
# INCLUDE
#-----------------------------------------------------------------------------------------------------
include("basis/TensorBasis.jl")
include("Operator.jl")
include("LinearOperation.jl")
include("Entanglement.jl")
include("Miscellaneous.jl")
include("algorithms/BlockDiagonal.jl")
end # module
