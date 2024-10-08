import * as vscode from 'vscode';
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);
let outputChannel: vscode.OutputChannel;

export function activate(context: vscode.ExtensionContext) {
    outputChannel = vscode.window.createOutputChannel('Auto Git Pull');
    outputChannel.show();

    const config = vscode.workspace.getConfiguration('gitPullOnOpen');

    if (config.get<boolean>('enabled')) {
        vscode.workspace.onDidOpenTextDocument(() => {
            handleGitFetchAndPull();
        });
    }
}

async function handleGitFetchAndPull() {
    outputChannel.appendLine('Checking for Git updates...');
    const workspaceFolders = vscode.workspace.workspaceFolders;

    if (workspaceFolders) {
        for (const folder of workspaceFolders) {
            outputChannel.appendLine(`Processing folder: ${folder.name}`);
            try {
                await execPromise(`git -C ${folder.uri.fsPath} fetch`);
                const currentBranch = await getCurrentBranch(folder.uri.fsPath);
                if (!currentBranch) {
                    outputChannel.appendLine(`No current branch found for ${folder.name}.`);
                    continue;
                }

                const { stdout } = await execPromise(`git -C ${folder.uri.fsPath} rev-list HEAD...origin/${currentBranch} --count`);
                const newCommitsCount = parseInt(stdout.trim(), 10);
                outputChannel.appendLine(`New commits found in ${folder.name}: ${newCommitsCount}`);

                if (newCommitsCount > 0) {
                    const { stdout: pullStdout, stderr: pullStderr } = await execPromise(`git -C ${folder.uri.fsPath} pull`);
                    outputChannel.appendLine(`Pulled latest changes in ${folder.name}: ${pullStdout}`);
                    if (pullStderr) {
                        outputChannel.appendLine(`Pull stderr: ${pullStderr}`);
                    }
                } else {
                    outputChannel.appendLine(`No new commits in ${folder.name}.`);
                }
            } catch (error) {
                if (error instanceof Error) {
                    outputChannel.appendLine(`Error processing ${folder.name}: ${error.message}`);
                } else {
                    outputChannel.appendLine(`Unknown error occurred while processing ${folder.name}`);
                }
            }
        }
    } else {
        outputChannel.appendLine('No workspace folders found.');
    }
}

async function getCurrentBranch(repoPath: string): Promise<string | null> {
    try {
        const { stdout } = await execPromise(`git -C ${repoPath} rev-parse --abbrev-ref HEAD`);
        const branchName = stdout.trim();
        outputChannel.appendLine(`Current branch for ${repoPath}: ${branchName}`);
        return branchName;
    } catch (error) {
        if (error instanceof Error) {
            outputChannel.appendLine(`Error getting current branch: ${error.message}`);
        } else {
            outputChannel.appendLine(`Unknown error occurred while getting current branch`);
        }
        return null;
    }
}

export function deactivate() {}
