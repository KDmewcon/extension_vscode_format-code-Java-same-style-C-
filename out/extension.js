"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = __importStar(require("vscode"));
function activate(context) {
    console.log('🔷 DVT Java Formatter is now active!');
    // Register the format command
    let formatCommand = vscode.commands.registerCommand('dvt.formatJavaWithCSharpStyle', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active editor found');
            return;
        }
        if (editor.document.languageId !== 'java') {
            vscode.window.showErrorMessage('This command only works with Java files');
            return;
        }
        const document = editor.document;
        const fullText = document.getText();
        try {
            const formattedText = formatJavaWithCSharpStyle(fullText);
            const edit = new vscode.WorkspaceEdit();
            const fullRange = new vscode.Range(document.positionAt(0), document.positionAt(fullText.length));
            edit.replace(document.uri, fullRange, formattedText);
            vscode.workspace.applyEdit(edit).then(() => {
                vscode.window.showInformationMessage('🔷 DVT: Java code formatted with C# style!');
            });
        }
        catch (error) {
            vscode.window.showErrorMessage(`🔷 DVT: Formatting failed: ${error}`);
        }
    });
    context.subscriptions.push(formatCommand);
}
exports.activate = activate;
function formatJavaWithCSharpStyle(text) {
    // Split into lines for processing
    let lines = text.split('\n');
    let result = [];
    let indentLevel = 0;
    const indentSize = 4;
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        let trimmedLine = line.trim();
        // Skip empty lines but preserve them
        if (trimmedLine === '') {
            result.push('');
            continue;
        }
        // Handle standalone braces with proper indentation
        if (trimmedLine === '{' || trimmedLine === '}') {
            // Handle closing braces - decrease indent first
            if (trimmedLine === '}') {
                indentLevel = Math.max(0, indentLevel - 1);
            }
            // Add the brace with proper indentation
            result.push(' '.repeat(indentLevel * indentSize) + trimmedLine);
            // Handle opening braces - increase indent after adding
            if (trimmedLine === '{') {
                indentLevel++;
            }
            continue;
        }
        // Preserve import statements, package declarations, and comments exactly as they are
        if (trimmedLine.startsWith('package ') ||
            trimmedLine.startsWith('import ') ||
            trimmedLine.startsWith('//') ||
            trimmedLine.startsWith('/*') ||
            trimmedLine.startsWith('*') ||
            trimmedLine.startsWith('*/')) {
            result.push(line);
            continue;
        }
        // Handle closing braces with else/else if/catch/finally - special case
        if (trimmedLine.startsWith('}') && (trimmedLine.includes('else') || trimmedLine.includes('catch') || trimmedLine.includes('finally'))) {
            indentLevel = Math.max(0, indentLevel - 1);
            // Add closing brace first
            result.push(' '.repeat(indentLevel * indentSize) + '}');
            // Extract everything after the }
            let afterBrace = trimmedLine.substring(1).trim();
            // Clean up spacing around keywords
            afterBrace = afterBrace.replace(/else\s*if\s*\(/g, 'else if (');
            afterBrace = afterBrace.replace(/else\s*\{/g, 'else {');
            afterBrace = afterBrace.replace(/catch\s*\(/g, 'catch (');
            afterBrace = afterBrace.replace(/finally\s*\{/g, 'finally {');
            afterBrace = afterBrace.replace(/\}\s*else/g, '} else');
            afterBrace = afterBrace.replace(/\}\s*catch/g, '} catch');
            afterBrace = afterBrace.replace(/\}\s*finally/g, '} finally');
            if (afterBrace) {
                // Handle else/catch/finally
                if (afterBrace.includes('{')) {
                    // Case: else {, catch (...) {, finally {
                    const braceIndex = afterBrace.indexOf('{');
                    const beforeBrace = afterBrace.substring(0, braceIndex).trim();
                    const afterOpenBrace = afterBrace.substring(braceIndex + 1).trim();
                    // Add keyword line
                    result.push(' '.repeat(indentLevel * indentSize) + beforeBrace);
                    // Add opening brace
                    result.push(' '.repeat(indentLevel * indentSize) + '{');
                    indentLevel++;
                    // Add content after brace if any
                    if (afterOpenBrace) {
                        result.push(' '.repeat(indentLevel * indentSize) + afterOpenBrace);
                    }
                }
                else {
                    // Case: without brace
                    result.push(' '.repeat(indentLevel * indentSize) + afterBrace);
                }
            }
            continue;
        }
        // Handle case and default labels - NO braces needed in Java switch
        if (trimmedLine.startsWith('case ') || trimmedLine.startsWith('default:')) {
            // Case labels should be at switch level indentation
            let caseIndent = Math.max(0, indentLevel - 1);
            let cleanedLine = cleanupJavaConstruct(trimmedLine);
            // Add case/default label only
            result.push(' '.repeat(caseIndent * indentSize) + cleanedLine);
            continue;
        }
        // Handle break statements in switch - normal indentation
        if (trimmedLine === 'break;') {
            // Add break statement with normal indentation
            result.push(' '.repeat(indentLevel * indentSize) + trimmedLine);
            continue;
        }
        // Handle closing braces - decrease indent first
        if (trimmedLine.startsWith('}')) {
            indentLevel = Math.max(0, indentLevel - 1);
        }
        // Check if this line has an opening brace that should be moved to next line
        if (trimmedLine.includes('{') && !trimmedLine.startsWith('{')) {
            // Extract the part before the brace
            const braceIndex = trimmedLine.indexOf('{');
            let beforeBrace = trimmedLine.substring(0, braceIndex).trim();
            const afterBrace = trimmedLine.substring(braceIndex + 1).trim();
            // Clean up common Java constructs
            beforeBrace = cleanupJavaConstruct(beforeBrace);
            // Add the line without the brace
            result.push(' '.repeat(indentLevel * indentSize) + beforeBrace);
            // Add the opening brace on its own line
            result.push(' '.repeat(indentLevel * indentSize) + '{');
            indentLevel++;
            // If there's content after the brace, add it with proper indentation
            if (afterBrace) {
                result.push(' '.repeat(indentLevel * indentSize) + afterBrace);
            }
        }
        else {
            // Clean up the line before adding
            let cleanedLine = cleanupJavaConstruct(trimmedLine);
            // Add the line with proper indentation
            result.push(' '.repeat(indentLevel * indentSize) + cleanedLine);
            // Handle opening braces - increase indent after adding the line
            if (trimmedLine.includes('{')) {
                indentLevel++;
            }
        }
    }
    return result.join('\n');
}
function cleanupJavaConstruct(line) {
    // Clean up spacing in common Java constructs
    line = line.replace(/\s*,\s*/g, ', '); // Fix spacing around commas
    line = line.replace(/\s*;\s*/g, ';'); // Fix spacing around semicolons
    // Fix multi-character operators first to avoid conflicts
    line = line.replace(/\s*<=\s*/g, ' <= '); // Fix spacing around <=
    line = line.replace(/\s*>=\s*/g, ' >= '); // Fix spacing around >=
    line = line.replace(/\s*==\s*/g, ' == '); // Fix spacing around ==
    line = line.replace(/\s*!=\s*/g, ' != '); // Fix spacing around !=
    line = line.replace(/\s*&&\s*/g, ' && '); // Fix spacing around &&
    line = line.replace(/\s*\|\|\s*/g, ' || '); // Fix spacing around ||
    // Fix single character operators (after multi-character ones)
    line = line.replace(/\s*=\s*(?!=)/g, ' = '); // Fix spacing around = (but not ==)
    line = line.replace(/\s*\+\s*/g, ' + '); // Fix spacing around +
    line = line.replace(/\s*-\s*/g, ' - '); // Fix spacing around -
    line = line.replace(/\s*\*\s*/g, ' * '); // Fix spacing around *
    line = line.replace(/\s*\/\s*/g, ' / '); // Fix spacing around /
    line = line.replace(/\s*!\s*/g, '!'); // Fix spacing around !
    line = line.replace(/\s*<\s*(?!=)/g, ' < '); // Fix spacing around < (but not <=)
    line = line.replace(/\s*>\s*(?!=)/g, ' > '); // Fix spacing around > (but not >=)
    // Fix specific Java constructs - NO SPACE before (
    line = line.replace(/if\s+\(/g, 'if(');
    line = line.replace(/for\s+\(/g, 'for(');
    line = line.replace(/while\s+\(/g, 'while(');
    line = line.replace(/switch\s+\(/g, 'switch(');
    line = line.replace(/catch\s+\(/g, 'catch(');
    line = line.replace(/else\s*if\s+\(/g, 'else if(');
    line = line.replace(/try\s*\{/g, 'try {');
    line = line.replace(/finally\s*\{/g, 'finally {');
    // Fix method calls - NO SPACE before (
    line = line.replace(/(\w+)\s+\(/g, '$1(');
    // Fix parentheses spacing - NO SPACE inside
    line = line.replace(/\(\s+/g, '('); // Remove space after (
    line = line.replace(/\s+\)/g, ')'); // Remove space before )
    // Fix case labels
    line = line.replace(/case\s+(\w+)\s*:/g, 'case $1:');
    line = line.replace(/case\s+"([^"]+)"\s*:/g, 'case "$1":');
    line = line.replace(/case\s+'([^']+)'\s*:/g, "case '$1':");
    line = line.replace(/default\s*:/g, 'default:');
    // Clean up multiple spaces
    line = line.replace(/\s+/g, ' ');
    return line.trim();
}
function deactivate() {
    console.log('🔷 DVT Java Formatter deactivated');
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map