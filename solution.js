function solvePuzzle(pieces) {
    const result = []

    // first puzzle
    if (!pieces[0].edges.left && !pieces[0].edges.top) result.push(pieces[0])
    else {
        let rotatedPuzzle = rotatePuzzle(pieces[0])
        if (!rotatedPuzzle.edges.left && !rotatedPuzzle.edges.top) result.push(rotatedPuzzle)
        else {
            rotatedPuzzle = rotatePuzzle(rotatedPuzzle)
            if (!rotatedPuzzle.edges.left && !rotatedPuzzle.edges.top) result.push(rotatedPuzzle)
            else {
                rotatedPuzzle = rotatePuzzle(rotatedPuzzle)
                if (!rotatedPuzzle.edges.left && !rotatedPuzzle.edges.top) result.push(rotatedPuzzle)
            }
        }
    }
    for (let k = 1; k < 10; k++) {
        for (let i = 1; i < 100; i++) {
            if (pieces[i].edges.left && pieces[i].edges.left.edgeTypeId === result[result.length - 1].edges.right.edgeTypeId) {
                result.push(pieces[i]);
                break
            } else {
                let rotatedPuzzle = rotatePuzzle(pieces[i])
                if (rotatedPuzzle.edges.left && rotatedPuzzle.edges.left.edgeTypeId === result[result.length - 1].edges.right.edgeTypeId) {
                    result.push(rotatedPuzzle);
                    break
                } else {
                    rotatedPuzzle = rotatePuzzle(rotatedPuzzle)
                    if (rotatedPuzzle.edges.left && rotatedPuzzle.edges.left.edgeTypeId === result[result.length - 1].edges.right.edgeTypeId) {
                        result.push(rotatedPuzzle);
                        break
                    } else {
                        rotatedPuzzle = rotatePuzzle(rotatedPuzzle)
                        if (rotatedPuzzle.edges.left && rotatedPuzzle.edges.left.edgeTypeId === result[result.length - 1].edges.right.edgeTypeId) {
                            result.push(rotatedPuzzle);
                            break
                        }
                    }
                }
            }
            if (!result[result.length - 1].edges.right) {
                break
            }
        }
    }


    console.log('result', result)

    return result.map(puzzle => puzzle.id)
}

function rotatePuzzle(piece) {
    let newPiece = {
        ...piece,
        edges: {
            top: {...piece.edges.top},
            right: {...piece.edges.right},
            bottom: {...piece.edges.bottom},
            left: {...piece.edges.left}
        }
    }
    newPiece.edges.top = piece.edges.left
    newPiece.edges.right = piece.edges.top
    newPiece.edges.bottom = piece.edges.right
    newPiece.edges.left = piece.edges.bottom
    return newPiece
}

// Не удаляйте эту строку
window.solvePuzzle = solvePuzzle;
