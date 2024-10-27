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

import { Vitals } from './vitals.js';
import { TopHatMeter, MeterNoVal } from './meter.js';
import { bytesToHumanString } from './helpers.js';

export const DiskMonitor = GObject.registerClass(
  class DiskMonitor extends TopHatMeter {
    private icon;
    private valueRead;
    private valueWrite;
    private menuDiskWrites;
    private menuDiskReads;

    constructor(metadata: ExtensionMetadata) {
      super('Disk Monitor', metadata);

      const gicon = Gio.icon_new_for_string(
        `${this.metadata.path}/icons/disk-icon-symbolic.svg`
      );
      this.icon = new St.Icon({
        gicon,
        style_class: 'system-status-icon tophat-panel-icon',
      });
      this.add_child(this.icon);

      const vbox = new St.BoxLayout({ vertical: true });
      vbox.connect('notify::vertical', (obj) => {
        obj.vertical = true;
      });
      this.add_child(vbox);

      const valueRead = new St.Label({
        text: MeterNoVal,
        style_class: 'tophat-panel-usage-stacked',
        y_expand: true,
        y_align: Clutter.ActorAlign.END,
      });
      vbox.add_child(valueRead);
      this.valueRead = valueRead;
      const valueWrite = new St.Label({
        text: MeterNoVal,
        style_class: 'tophat-panel-usage-stacked',
        y_expand: true,
        y_align: Clutter.ActorAlign.START,
      });
      vbox.add_child(valueWrite);
      this.valueWrite = valueWrite;

      this.menuDiskWrites = new St.Label();
      this.menuDiskReads = new St.Label();

      this.buildMenu();
      this.addMenuButtons();
    }

    private buildMenu() {
      this.menuNumCols = 3;

      let label = new St.Label({
        text: _('Disk activity'),
        style_class: 'menu-header',
      });
      this.addMenuRow(label, 0, 3, 1);

      label = new St.Label({
        text: _('Reading:'),
        style_class: 'menu-label',
      });
      this.addMenuRow(label, 0, 2, 1);
      this.menuDiskReads.text = MeterNoVal;
      this.menuDiskReads.add_style_class_name('menu-value');
      this.addMenuRow(this.menuDiskReads, 2, 1, 1);

      label = new St.Label({
        text: _('Writing:'),
        style_class: 'menu-label',
      });
      this.addMenuRow(label, 0, 2, 1);
      this.menuDiskWrites.text = MeterNoVal;
      this.menuDiskWrites.add_style_class_name('menu-value menu-section-end');
      this.addMenuRow(this.menuDiskWrites, 2, 1, 1);
    }

    public override bindVitals(vitals: Vitals): void {
      vitals.connect('notify::disk-read', () => {
        const s = bytesToHumanString(vitals.disk_read);
        this.valueRead.text = s;
        this.menuDiskReads.text = s;
      });
      vitals.connect('notify::disk-wrote', () => {
        const s = bytesToHumanString(vitals.disk_wrote);
        this.valueWrite.text = s;
        this.menuDiskWrites.text = s;
      });
    }
  }
);

export type DiskMonitor = InstanceType<typeof DiskMonitor>;
