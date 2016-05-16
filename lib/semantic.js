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
        tree.variables.forEach((val) => addValSymbolTable(tree.symbolTable, val, "variable"));
        tree.constants.forEach((val) => addValSymbolTable(tree.symbolTable, val, "constant"));
        tree.functions.forEach((val) => addValSymbolTable(tree.symbolTable, val.name.value, "function"));
    };

    let addValSymbolTable = (symbolTable, val, type) => {
        if(val instanceof Array) {
            if(symbolTable[val[0]])
                console.log(type + " definition " + val[0] + " duplicated");
            symbolTable[val[0]] = val[1];
        }
        else {
            if(symbolTable[val])
                console.log(type +" definition " + val + " duplicated");
            symbolTable[val] = "undefined";
        }
    };

    module.exports = semantic;
})();
