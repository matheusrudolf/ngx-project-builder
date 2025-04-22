import { ElementRef } from "@angular/core";
import { MenuItem } from "primeng/api";

export class Menu {

    public static getMenu(): MenuItem[] {
        return [
            {
                label: 'Files', items: [
                    { icon: 'pi pi-file-plus', label: 'New project' },
                    { icon: 'pi pi-file', label: 'Open a project' },
                    { icon: 'pi pi-folder-open', label: 'Open Recent project' },
                    { icon: 'pi pi-sign-out', label: 'Exit' }
                ]
            },
            { label: 'Help' }
        ];
    }

    public static getContextMenu(textarea: ElementRef, currentOutput: string): MenuItem[] {
        return [
            { icon: 'pi pi-copy', label: 'Copy', command: () => this.copyTextareaLog(textarea) },
            { icon: 'pi pi-trash', label: 'Clear', command: () => currentOutput = '' }
        ];
    }

    private static copyTextareaLog(textareaRef: ElementRef): void {
        const textarea: HTMLTextAreaElement = textareaRef.nativeElement;
        textarea.select();

        try {
            const successful = document.execCommand('copy');
            const msg = successful ? 'successful' : 'unsuccessful';
        } catch (err) {
            console.error('Unable to copy: ', err);
        }
    }
}