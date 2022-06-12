# TopHat
TopHat is an elegant system resource monitor for the GNOME shell. It display CPU, memory, and network activity in the GNOME top bar.

<img src="./screenshots/cpu.png?raw=true" width="360px" alt="Screenshot of processor usage indicator">
<img src="./screenshots/mem.png?raw=true" width="360px" alt="Screenshot of memory usage indicator">
<img src="./screenshots/net.png?raw=true" width="360px" alt="Screenshot of network usage indicator">

## Requirements

- GNOME 3.38 or newer
- GIRepository (gir) bindings for the gtop system monitoring library (e.g., gir1.2-gtop-2.0 on Debian-based systems)

## Tested against

- CenOS Stream 9
- Debian 11.3
- Fedora 36
- Ubuntu 22.04 LTS

## Contributing and dev notes

To view logged output, use the command `journalctl -f -o cat /usr/bin/gnome-shell`.

To simulate heavy system load, use the `stress-ng` tool, e.g. `stress-ng --timeout 10s --cpu 8`.

To install manually:
    
    mkdir -p ~/.local/share/gnome-shell/extensions/
    ln -s [path to tophat repository] ~/.local/share/gnome-shell/extensions/tophat@fflewddur.github.io

## Icons

Icons used with permission from [thenounproject.com](https://thenounproject.com).

Processor: [jai](https://thenounproject.com/jairam.182/)  
Memory: [Loudoun Design Co.](https://thenounproject.com/LoudounDesignCo/)  
Network: [Pixel Bazaar](https://thenounproject.com/pixelbazaar/)  
