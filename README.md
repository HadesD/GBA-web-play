# GameBoy & GameBoy Color & GameBoy Advance Emulator

This project is trying to make an emulator for GB, GBC, GBA that can run in browser.

I'm trying to implement the most of lightweight library, to helping more browser can using it.

Frontend: https://hadesd.github.io/GameBoyAdvance/index.html

## Some Demos

<img src="https://cdn.discordapp.com/attachments/157873776040607744/361569999820816386/image.png" width=200><img src="https://cdn.discordapp.com/attachments/157873776040607744/361569816416616448/unknown.png" width=200><img src="https://cdn.discordapp.com/attachments/157873776040607744/361569052373549056/image.png" width=200><img src="https://cdn.discordapp.com/attachments/157873776040607744/361569011411976199/image.png" width=200>

## Features:

- Supported GB, GBC, GBA ROM
- DMG/CGB mode
- Heavily Optimized (no asm.js tho)
- Customizable controls
- Savestates
- Saves using localStorage
- Cycle Accurate Instruction Timings
- Realtime audio emulation using the Web Audio API
- Mobile Client, runs full speed on iPhone 5 and up
- RUNS POKEMON! (obviously the most important feature)

## In future:

- Instruction memory timings
- OAM bug
- Cycle accurate display timings
- Display behaviour during write to VRAM while busy
- Wave RAM bug (DMG)
- Boot w/o bios
- Super Gameboy mode
- Downsample audio from high frequency/generate antialiased waves
- IDE for assembling and debugging gameboy programs.
- Support Firefox / IE (Remove WebSQL)
- Optimize GBA.js

## License

- Follow https://github.com/endrift/gbajs
- Follow https://github.com/riperiperi/amebo
- MIT (c) Hai Le (a.k.a Dark.Hades)

