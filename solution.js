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


    for (let line = 0; line < 10; line++) {
        for (let puzzle = 0; puzzle < 9; puzzle++) {
            let isBreak = false
            console.log('новая пробежка')
            for (let i = 1; i < pieces.length; i++) {
                let newPuzzle = pieces[i]
                for (let j = 0; j < 4; j++) {
                    newPuzzle = rotatePuzzle(newPuzzle)
                    if (newPuzzle.edges.left && (newPuzzle.edges.left.edgeTypeId === result[result.length - 1].edges.right.edgeTypeId)) {
                        result.push(newPuzzle)
                        isBreak = true
                        pieces = pieces.filter(piece => piece.id !== newPuzzle.id)
                        console.log('нашел')
                        break
                    }
                }
                if (isBreak) break
            }
        }
        for (let i = 1; i < pieces.length; i++) {
            let isBreak = false
            let newPuzzle = pieces[i]
            for (let j=0; j<4; j++) {
                newPuzzle = rotatePuzzle(newPuzzle)
                if (newPuzzle.edges.top && (newPuzzle.edges.top.edgeTypeId === result[result.length-10].edges.bottom.edgeTypeId)) {
                    result.push(newPuzzle)
                    pieces = pieces.filter(piece => piece.id !== newPuzzle.id)
                    isBreak = true
                    break
                }
            }
            if (isBreak) break
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
