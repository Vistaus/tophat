// Copyright (C) 2024 Todd Kulesza <todd@dropline.net>

// This file is part of TopHat.

// TopHat is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// TopHat is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with TopHat. If not, see <https://www.gnu.org/licenses/>.

import GObject from 'gi://GObject';
import Gio from 'gi://Gio';
import Clutter from 'gi://Clutter';
import St from 'gi://St';

import {
  ExtensionMetadata,
  gettext as _,
} from 'resource:///org/gnome/shell/extensions/extension.js';

import { TopHatMeter } from './meter.js';

export const CpuMonitor = GObject.registerClass(
  class CpuMonitor extends TopHatMeter {
    private icon;
    private usage;
    private menuCpuUsage?: St.Label;

    constructor(metadata: ExtensionMetadata) {
      super('CPU Monitor', metadata);

      const gicon = Gio.icon_new_for_string(
        `${this.metadata.path}/icons/cpu-icon-symbolic.svg`
      );
      this.icon = new St.Icon({
        gicon,
        style_class: 'system-status-icon tophat-panel-icon',
      });
      this.add_child(this.icon);

      this.usage = new St.Label({
        text: '',
        style_class: 'tophat-panel-usage',
        y_align: Clutter.ActorAlign.CENTER,
      });
      this.add_child(this.usage);

      this.buildMenu();
      this.addMenuButtons();
    }

    private buildMenu() {
      let label = new St.Label({
        text: _('Processor usage'),
        style_class: 'menu-header',
      });
      this.addMenuRow(label, 0, 2, 1);

      label = new St.Label({
        text: _('Processor utilization:'),
        style_class: 'menu-label menu-section-end',
      });
      this.addMenuRow(label, 0, 1, 1);
      this.menuCpuUsage = new St.Label({
        text: '0%',
        style_class: 'menu-value menu-section-end',
      });
      this.addMenuRow(this.menuCpuUsage, 1, 1, 1);
    }
  }
);

export type CpuMonitor = InstanceType<typeof CpuMonitor>;
