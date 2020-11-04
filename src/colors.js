const _END_COLORS   = '\u001b[39m'
const _PURPLE       = '\u001b[0;35m'
const _LIGHT_PURPLE = '\u001b[1;35m'
const _RED          = '\u001b[0;31m'
const _LIGHT_RED    = '\u001b[1;31m'
const _GREEN        = '\u001b[0;32m'
const _LIGHT_GREEN  = '\u001b[1;32m'
const _YELLOW       = '\u001b[0;33m'
const _BLUE         = '\u001b[0;34m'
const _LIGHT_BLUE   = '\u001b[1;34m'
const _CYAN         = '\u001b[0;36m'
const _LIGHT_CYAN   = '\u001b[1;36m'
const _WHITE        = '\u001b[1;37m'  
const _GRAY         = '\u001b[0;37m'
const _DARK_GRAY    = '\u001b[1;30m'

const _f = (col, s) => {
  return col + s + _END_COLORS
}

const PURPLE      = (s) => _f(_PURPLE, s)
const LIGHT_PURPLE= (s) => _f(_LIGHT_PURPLE, s)
const RED         = (s) => _f(_RED, s)
const LIGHT_RED   = (s) => _f(_LIGHT_RED, s)
const GREEN       = (s) => _f(_GREEN, s)
const LIGHT_GREEN = (s) => _f(_LIGHT_GREEN, s)
const YELLOW      = (s) => _f(_YELLOW, s)
const BLUE        = (s) => _f(_BLUE, s)
const LIGHT_BLUE  = (s) => _f(_LIGHT_BLUE, s)
const CYAN        = (s) => _f(_CYAN, s)
const LIGHT_CYAN  = (s) => _f(_LIGHT_CYAN, s)
const WHITE       = (s) => _f(_WHITE, s)
const GRAY        = (s) => _f(_GRAY, s)
const DARK_GRAY   = (s) => _f(_DARK_GRAY, s)

const uncolor = (s) => s.replace(/\u001b\[.*?m/g, '')

function isTooDark(col) {
  try {
    const c = col.substring(1);   // strip #
    const rgb = parseInt(c, 16);  // convert rrggbb to decimal
    const r = (rgb >> 16) & 0xff; // extract red
    const g = (rgb >> 8) & 0xff;  // extract green
    const b = (rgb >> 0) & 0xff;  // extract blue
    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

    if (luma < 42) {
      return true
    }
  } catch (e) {}
  return false
}


function shadeColor(color, percent) {
  const f = parseInt(color.slice(1), 16), t = percent < 0 ? 0 : 255, p = percent < 0 ? percent * -1 : percent, R = f >> 16, G = f >> 8 & 0x00FF, B = f & 0x0000FF;
  return "#" + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1);
}

function blendColors(c0, c1, p) {
  const f = parseInt(c0.slice(1), 16), t = parseInt(c1.slice(1), 16), R1 = f >> 16, G1 = f >> 8 & 0x00FF, B1 = f & 0x0000FF, R2 = t >> 16, G2 = t >> 8 & 0x00FF, B2 = t & 0x0000FF;
  return "#" + (0x1000000 + (Math.round((R2 - R1) * p) + R1) * 0x10000 + (Math.round((G2 - G1) * p) + G1) * 0x100 + (Math.round((B2 - B1) * p) + B1)).toString(16).slice(1);
}

function hslToHex(h, s, l) {
  h /= 360;
  s /= 100;
  l /= 100;
  let r, g, b;
  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  const toHex = x => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function randomHex() {
  return '#'+(Math.random()*0xFFFFFF<<0).toString(16)
}


export { PURPLE, LIGHT_PURPLE, RED, LIGHT_RED, GREEN,
         LIGHT_GREEN, YELLOW, BLUE, LIGHT_BLUE, CYAN, 
         LIGHT_CYAN, WHITE, GRAY, DARK_GRAY, uncolor, 
         isTooDark, shadeColor, blendColors, hslToHex, randomHex}

/*
txtblk='\e[0;30m' # Black - Regular
txtred='\e[0;31m' # Red
txtgrn='\e[0;32m' # Green
txtylw='\e[0;33m' # Yellow
txtblu='\e[0;34m' # Blue
txtpur='\e[0;35m' # Purple
txtcyn='\e[0;36m' # Cyan
txtwht='\e[0;37m' # White
bldblk='\e[1;30m' # Black - Bold
bldred='\e[1;31m' # Red
bldgrn='\e[1;32m' # Green
bldylw='\e[1;33m' # Yellow
bldblu='\e[1;34m' # Blue
bldpur='\e[1;35m' # Purple
bldcyn='\e[1;36m' # Cyan
bldwht='\e[1;37m' # White
unkblk='\e[4;30m' # Black - Underline
undred='\e[4;31m' # Red
undgrn='\e[4;32m' # Green
undylw='\e[4;33m' # Yellow
undblu='\e[4;34m' # Blue
undpur='\e[4;35m' # Purple
undcyn='\e[4;36m' # Cyan
undwht='\e[4;37m' # White
bakblk='\e[40m'   # Black - Background
bakred='\e[41m'   # Red
bakgrn='\e[42m'   # Green
bakylw='\e[43m'   # Yellow
bakblu='\e[44m'   # Blue
bakpur='\e[45m'   # Purple
bakcyn='\e[46m'   # Cyan
bakwht='\e[47m'   # White
txtrst='\e[0m'    # Text Reset

5; Blinking?
7; inverted?

https://en.wikipedia.org/wiki/ANSI_escape_code
*/