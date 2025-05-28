import * as vscode from 'vscode';

// Configuration helper
function getConfig() {
    const config = vscode.workspace.getConfiguration('dvt');
    return {
        autoFormatOnCloseBrace: config.get<boolean>('autoFormatOnCloseBrace', true),
        indentSize: config.get<number>('indentSize', 4),
        allmanBraceStyle: config.get<boolean>('allmanBraceStyle', true)
    };
}

// Document Formatting Provider
class DVTJavaFormattingProvider implements vscode.DocumentFormattingEditProvider {
    provideDocumentFormattingEdits(document: vscode.TextDocument): vscode.TextEdit[] {
        const fullText = document.getText();
        const formattedText = formatJavaWithCSharpStyle(fullText);

        const fullRange = new vscode.Range(
            document.positionAt(0),
            document.positionAt(fullText.length)
        );

        return [vscode.TextEdit.replace(fullRange, formattedText)];
    }
}

// Range Formatting Provider
class DVTJavaRangeFormattingProvider implements vscode.DocumentRangeFormattingEditProvider {
    provideDocumentRangeFormattingEdits(document: vscode.TextDocument, range: vscode.Range): vscode.TextEdit[] {
        const selectedText = document.getText(range);
        const formattedText = formatJavaWithCSharpStyle(selectedText);

        return [vscode.TextEdit.replace(range, formattedText)];
    }
}

// On Type Formatting Provider (for auto-format on '}')
class DVTJavaOnTypeFormattingProvider implements vscode.OnTypeFormattingEditProvider {
    provideOnTypeFormattingEdits(document: vscode.TextDocument, position: vscode.Position, ch: string): vscode.TextEdit[] {
        const config = getConfig();

        // Only format if auto-format is enabled and character is '}'
        if (!config.autoFormatOnCloseBrace || ch !== '}') {
            return [];
        }

        // Get the current line
        const line = document.lineAt(position.line);
        const lineText = line.text;

        // Check if the '}' is the only character on the line (after trimming)
        if (lineText.trim() === '}') {
            // Format the entire document
            const fullText = document.getText();
            const formattedText = formatJavaWithCSharpStyle(fullText);

            const fullRange = new vscode.Range(
                document.positionAt(0),
                document.positionAt(fullText.length)
            );

            return [vscode.TextEdit.replace(fullRange, formattedText)];
        }

        return [];
    }
}

export function activate(context: vscode.ExtensionContext) {
    console.log('Java Formatter Like Style C# DVT-KDMEWCON is now active!');

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
            const fullRange = new vscode.Range(
                document.positionAt(0),
                document.positionAt(fullText.length)
            );
            edit.replace(document.uri, fullRange, formattedText);

            vscode.workspace.applyEdit(edit).then(() => {
                vscode.window.showInformationMessage('Java Formatter Like Style C# DVT-KDMEWCON: Code formatted successfully!');
            });
        } catch (error) {
            vscode.window.showErrorMessage(`Java Formatter Like Style C# DVT-KDMEWCON: Formatting failed: ${error}`);
        }
    });

    // Register formatting providers
    const javaSelector: vscode.DocumentSelector = { language: 'java', scheme: 'file' };

    const documentFormattingProvider = vscode.languages.registerDocumentFormattingEditProvider(
        javaSelector,
        new DVTJavaFormattingProvider()
    );

    const rangeFormattingProvider = vscode.languages.registerDocumentRangeFormattingEditProvider(
        javaSelector,
        new DVTJavaRangeFormattingProvider()
    );

    const onTypeFormattingProvider = vscode.languages.registerOnTypeFormattingEditProvider(
        javaSelector,
        new DVTJavaOnTypeFormattingProvider(),
        '}' // Trigger character
    );

    context.subscriptions.push(
        formatCommand,
        documentFormattingProvider,
        rangeFormattingProvider,
        onTypeFormattingProvider
    );
}

function formatJavaWithCSharpStyle(text: string): string {
    const config = getConfig();

    // Split into lines for processing
    let lines = text.split('\n');
    let result: string[] = [];
    let indentLevel = 0;
    const indentSize = config.indentSize;

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
                } else {
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
        } else {
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

function cleanupJavaConstruct(line: string): string {
    // STEP 1: Fix all broken operators FIRST (before any other processing)

    // Fix increment/decrement (HIGHEST PRIORITY - no spaces ever)
    line = line.replace(/(\w+)\s*\+\s*\+\s*/g, '$1++');     // "i + +" or "i ++" -> "i++"
    line = line.replace(/(\w+)\s*-\s*-\s*/g, '$1--');       // "i - -" or "i --" -> "i--"
    line = line.replace(/\+\s*\+\s*(\w+)/g, '++$1');        // "+ + i" or "++ i" -> "++i"
    line = line.replace(/-\s*-\s*(\w+)/g, '--$1');          // "- - i" or "-- i" -> "--i"

    // Fix shift operators (no spaces)
    line = line.replace(/>\s*>\s*>/g, '>>>');        // "> > >" -> ">>>"
    line = line.replace(/>\s*>/g, '>>');             // "> >" -> ">>"
    line = line.replace(/<\s*</g, '<<');             // "< <" -> "<<"

    // Fix comments (no spaces)
    line = line.replace(/\/\s*\//g, '//');           // "/ /" -> "//"

    // Fix compound assignment operators (with proper spacing)
    line = line.replace(/(\w+)\s*%\s*=\s*/g, '$1 %= ');     // "x % =" -> "x %= "
    line = line.replace(/(\w+)\s*\+\s*=\s*/g, '$1 += ');    // "x + =" -> "x += "
    line = line.replace(/(\w+)\s*-\s*=\s*/g, '$1 -= ');     // "x - =" -> "x -= "
    line = line.replace(/(\w+)\s*\*\s*=\s*/g, '$1 *= ');    // "x * =" -> "x *= "
    line = line.replace(/(\w+)\s*\/\s*=\s*/g, '$1 /= ');    // "x / =" -> "x /= "
    line = line.replace(/(\w+)\s*&\s*=\s*/g, '$1 &= ');     // "x & =" -> "x &= "
    line = line.replace(/(\w+)\s*\|\s*=\s*/g, '$1 |= ');    // "x | =" -> "x |= "
    line = line.replace(/(\w+)\s*\^\s*=\s*/g, '$1 ^= ');    // "x ^ =" -> "x ^= "

    // Fix comparison operators (with proper spacing)
    // Handle cases with word before operator
    line = line.replace(/(\w+)\s*=\s+=\s*/g, '$1 == ');     // "value = = " -> "value == "
    line = line.replace(/(\w+)\s*=\s+=(\w)/g, '$1 == $2');  // "value = =1" -> "value == 1"
    line = line.replace(/(\w+)\s*!\s+=\s*/g, '$1 != ');     // "value ! = " -> "value != "
    line = line.replace(/(\w+)\s*!\s+=(\w)/g, '$1 != $2');  // "value ! =1" -> "value != 1"
    line = line.replace(/(\w+)\s*<\s+=\s*/g, '$1 <= ');     // "value < = " -> "value <= "
    line = line.replace(/(\w+)\s*<\s+=(\w)/g, '$1 <= $2');  // "value < =1" -> "value <= 1"
    line = line.replace(/(\w+)\s*>\s+=\s*/g, '$1 >= ');     // "value > = " -> "value >= "
    line = line.replace(/(\w+)\s*>\s+=(\w)/g, '$1 >= $2');  // "value > =1" -> "value >= 1"

    // Handle cases without word before operator (like in conditions)
    line = line.replace(/=\s+=\s*/g, ' == ');               // "= = " -> " == "
    line = line.replace(/=\s+=(\w)/g, ' == $1');            // "= =1" -> " == 1"
    line = line.replace(/!\s+=\s*/g, ' != ');               // "! = " -> " != "
    line = line.replace(/!\s+=(\w)/g, ' != $1');            // "! =1" -> " != 1"
    line = line.replace(/<\s+=\s*/g, ' <= ');               // "< = " -> " <= "
    line = line.replace(/<\s+=(\w)/g, ' <= $1');            // "< =1" -> " <= 1"
    line = line.replace(/>\s+=\s*/g, ' >= ');               // "> = " -> " >= "
    line = line.replace(/>\s+=(\w)/g, ' >= $1');            // "> =1" -> " >= 1"

    // Fix logical operators
    line = line.replace(/&\s+&/g, ' && ');           // "& &" -> " && "
    line = line.replace(/\|\s+\|/g, ' || ');         // "| |" -> " || "

    // Fix compound assignment operators
    line = line.replace(/(\w+)\s*\+\s+=\s*/g, '$1 += ');    // "x + = " -> "x += "
    line = line.replace(/(\w+)\s*\+\s+=(\w)/g, '$1 += $2'); // "x + =5" -> "x += 5"
    line = line.replace(/(\w+)\s*-\s+=\s*/g, '$1 -= ');     // "x - = " -> "x -= "
    line = line.replace(/(\w+)\s*-\s+=(\w)/g, '$1 -= $2');  // "x - =5" -> "x -= 5"
    line = line.replace(/(\w+)\s*\*\s+=\s*/g, '$1 *= ');    // "x * = " -> "x *= "
    line = line.replace(/(\w+)\s*\*\s+=(\w)/g, '$1 *= $2'); // "x * =5" -> "x *= 5"
    line = line.replace(/(\w+)\s*\/\s+=\s*/g, '$1 /= ');    // "x / = " -> "x /= "
    line = line.replace(/(\w+)\s*\/\s+=(\w)/g, '$1 /= $2'); // "x / =5" -> "x /= 5"
    line = line.replace(/(\w+)\s*%\s+=\s*/g, '$1 %= ');     // "x % = " -> "x %= "
    line = line.replace(/(\w+)\s*%\s+=(\w)/g, '$1 %= $2');  // "x % =5" -> "x %= 5"
    line = line.replace(/(\w+)\s*&\s+=\s*/g, '$1 &= ');     // "x & = " -> "x &= "
    line = line.replace(/(\w+)\s*&\s+=(\w)/g, '$1 &= $2');  // "x & =5" -> "x &= 5"
    line = line.replace(/(\w+)\s*\|\s+=\s*/g, '$1 |= ');    // "x | = " -> "x |= "
    line = line.replace(/(\w+)\s*\|\s+=(\w)/g, '$1 |= $2'); // "x | =5" -> "x |= 5"
    line = line.replace(/(\w+)\s*\^\s+=\s*/g, '$1 ^= ');    // "x ^ = " -> "x ^= "
    line = line.replace(/(\w+)\s*\^\s+=(\w)/g, '$1 ^= $2'); // "x ^ =5" -> "x ^= 5"

    // Fix method chaining - remove space before dot
    line = line.replace(/\)\s+\./g, ').');               // ") ." -> ")."
    line = line.replace(/(\w+)\s+\./g, '$1.');           // "obj ." -> "obj."

    // Fix cast operators - remove space between ) and variable/method
    line = line.replace(/\)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g, ')$1');  // ") JSONValue" -> ")JSONValue"
    line = line.replace(/\)\s+([a-zA-Z_$][a-zA-Z0-9_$]*\.[a-zA-Z_$][a-zA-Z0-9_$]*)/g, ')$1');  // ") obj.method" -> ")obj.method"

    // Fix negative numbers - remove space between - and number (but not for subtraction)
    line = line.replace(/([=\(,\s])-\s+(\d+)/g, '$1-$2'); // "= - 5" -> "= -5", "( - 5" -> "(-5"
    line = line.replace(/^-\s+(\d+)/g, '-$1');            // "- 5" at start -> "-5"

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
    line = line.replace(/\(\s+/g, '(');  // Remove space after (
    line = line.replace(/\s+\)/g, ')');  // Remove space before )

    // Fix case labels
    line = line.replace(/case\s+(\w+)\s*:/g, 'case $1:');
    line = line.replace(/case\s+"([^"]+)"\s*:/g, 'case "$1":');
    line = line.replace(/case\s+'([^']+)'\s*:/g, "case '$1':");
    line = line.replace(/default\s*:/g, 'default:');

    // FINAL STEP: Clean up spacing around commas and semicolons
    line = line.replace(/\s*,\s*/g, ', ');   // Fix spacing around commas
    line = line.replace(/\s*;\s*/g, ';');    // Fix spacing around semicolons

    // Clean up multiple spaces (but preserve our fixed operators)
    // Protect our operators first
    const protectedOps = [
        ['++', '___PLUSPLUS___'],
        ['--', '___MINUSMINUS___'],
        ['>>', '___RIGHTSHIFT___'],
        ['<<', '___LEFTSHIFT___'],
        ['>>>', '___UNSIGNEDSHIFT___'],
        ['//', '___COMMENT___'],
        ['==', '___EQUALS___'],
        ['!=', '___NOTEQUALS___'],
        ['<=', '___LESSEQUAL___'],
        ['>=', '___GREATEREQUAL___'],
        ['&&', '___AND___'],
        ['||', '___OR___'],
        ['+=', '___PLUSEQUAL___'],
        ['-=', '___MINUSEQUAL___'],
        ['*=', '___MULTIPLYEQUAL___'],
        ['/=', '___DIVIDEEQUAL___'],
        ['%=', '___MODEQUAL___'],
        ['&=', '___ANDEQUAL___'],
        ['|=', '___OREQUAL___'],
        ['^=', '___XOREQUAL___']
    ];

    // Protect operators
    protectedOps.forEach(([op, placeholder]) => {
        line = line.replace(new RegExp(op.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), placeholder);
    });

    // Clean up multiple spaces
    line = line.replace(/\s{2,}/g, ' ');

    // Restore operators
    protectedOps.forEach(([op, placeholder]) => {
        line = line.replace(new RegExp(placeholder, 'g'), op);
    });

    return line.trim();
}

export function deactivate() {
    console.log('Java Formatter Like Style C# DVT-KDMEWCON deactivated');
}
