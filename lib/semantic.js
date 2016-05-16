(() => {
    "use strict";

    let symbolTableEmpty = {};

    let semantic = (tree) => eachBlockPre(tree, createSymbolTable, symbolTableEmpty);

    let eachBlockPre = (tree, callBackAction, symbolTable) => {
        callBackAction(tree, symbolTable);
        tree.functions.forEach((val) => eachBlockPre(val, callBackAction, tree.symbolTable));
    }

    let createSymbolTable = (tree, symbolTable) => {
        tree.symbolTable = {
            father: symbolTable
        };
        tree.variables.forEach((val) => addValSymbolTable(tree.symbolTable, val));
        tree.constants.forEach((val) => addValSymbolTable(tree.symbolTable, val));
        tree.functions.forEach((val) => addValSymbolTable(tree.symbolTable, val.name.value));
    };

    let addValSymbolTable = (symbolTable, val) => {
        if(val instanceof Array) {
            if(symbolTable[val[0]])
                console.error("Constant definition " + val[0] + " duplicated");
            symbolTable[val[0]] = val[1];
        }
        else {
            if(symbolTable[val])
                console.error("Constant definition " + val + " duplicated");
            symbolTable[val] = "undefined";
        }
    };

    module.exports = semantic;
})();
