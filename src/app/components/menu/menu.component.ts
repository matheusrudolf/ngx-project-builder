import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MENU_IMPORTS } from './menu-imports';

@Component({
  standalone: true,
  selector: 'pb-menu',
  templateUrl: './menu.component.html',
  imports: MENU_IMPORTS,
})
export class MenuComponent implements OnInit {
  menu: MenuItem[] = [
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

  constructor() { }

  ngOnInit() {
  }

}
