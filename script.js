const C = [["Fern Hollow", "LP-214", "#8aa17c"], ["Olive Ground", "LP-T27", "#6b7a4a"], ["Harbor Mist", "LP-087", "#9fb7bf"], ["Clay Pot", "LP-302", "#c98b5e"], ["Oat Milk", "LP-011", "#e6dccb"], ["Dusk Plum", "LP-455", "#7a5a72"], ["Buttercup", "LP-130", "#ecc85f"], ["Ink Blue", "LP-520", "#2f4a63"], ["Blush Sand", "LP-066", "#e3c2b2"], ["Sage Tea", "LP-198", "#b5c2a4"], ["Stone Gray", "LP-020", "#a7a8a2"], ["Brick Dust", "LP-340", "#a8604a"]];
const box = document.getElementById('chips');
C.forEach((c, i) => {
    const b = document.createElement('button'); b.className = 'chip'; b.style.background = c[2]; b.setAttribute('aria-label', c[0]); b.setAttribute('aria-pressed', i == 0);
    b.onclick = () => { document.documentElement.style.setProperty('--wall', c[2]); cname.textContent = c[0]; ccode.textContent = c[1]; tname.firstChild.nodeValue = c[0];[...box.children].forEach(x => x.setAttribute('aria-pressed', x === b)) }; box.appendChild(b)
});

const $ = id => document.getElementById(id);
const EX = [["Linen White", "LP-002", "#efe9dd"], ["Rosewood", "LP-410", "#9a5a5a"], ["Lagoon", "LP-560", "#3f8f9b"], ["Charcoal", "LP-900", "#3a3f42"], ["Pistachio", "LP-176", "#b9d08f"], ["Terracotta", "LP-335", "#b86a4b"]];
const VC = C.concat(EX), vst = $('vstage'), vch = $('vchips');
const scenes = [["Living room", document.querySelector('.room svg')], ...[...document.querySelectorAll('.tile')].map(t => [t.querySelector('span').firstChild.textContent, t.querySelector('svg')])];
function showScene(i) { [...$('vtabs').children].forEach((b, j) => b.setAttribute('aria-selected', i == j)); vst.innerHTML = ''; const c = scenes[i][1].cloneNode(true); c.setAttribute('preserveAspectRatio', 'xMidYMid slice'); c.setAttribute('role', 'img'); c.setAttribute('aria-label', scenes[i][0]); vst.appendChild(c) }
scenes.forEach((x, i) => { const b = document.createElement('button'); b.className = 'tab'; b.role = 'tab'; b.textContent = x[0]; b.onclick = () => showScene(i); $('vtabs').appendChild(b) });
function vSet(n, code, hex) { vst.style.setProperty('--wall', hex); $('vn').textContent = n; $('vc').textContent = code; $('vhex').textContent = hex.toUpperCase(); $('vcustom').value = hex; document.querySelector('.panel .sw').style.background = hex }
VC.forEach((c, i) => { const b = document.createElement('button'); b.className = 'chip'; b.style.background = c[2]; b.setAttribute('aria-label', c[0]); b.setAttribute('aria-pressed', i == 0); b.onclick = () => { vSet(c[0], c[1], c[2]);[...vch.children].forEach(x => x.setAttribute('aria-pressed', x === b)) }; vch.appendChild(b) });
$('vcustom').oninput = e => { vSet('Custom color', 'Your pick', e.target.value);[...vch.children].forEach(x => x.setAttribute('aria-pressed', false)) };
$('vcopy').onclick = () => { const t = $('vhex').textContent; const d = () => { $('vcopy').textContent = 'Copied ' + t; setTimeout(() => $('vcopy').textContent = 'Copy color code', 1800) }; try { navigator.clipboard.writeText(t).then(d, d) } catch (e) { d() } };
showScene(0); vSet('Fern Hollow', 'LP-214', '#8aa17c');
document.querySelectorAll('.tile').forEach((t, i) => t.onclick = () => { showScene(i + 1); $('visualizer').scrollIntoView() });
function calc() {
    const m = $('u').value == 'm', f = m ? 3.281 : 1, n = id => Math.max(0, parseFloat($(id).value) || 0), L = n('L') * f, W = n('W') * f, H = n('H') * f, co = +$('co').value;
    let a = Math.max(0, 2 * (L + W) * H - n('D') * 20 - n('Wn') * 15); if ($('ce').checked) a += L * W; let g = a * co / 350, gr = Math.ceil(g * 4) / 4, p = Math.floor(g / 5), r = Math.ceil(g - p * 5 - 1e-9), pl = r == 5 ? (p++, 0) : r;
    const cans = [p ? p + ' × 5 gal' : '', pl ? pl + ' × 1 gal' : ''].filter(Boolean).join(' + ') || '0';
    $('rg').textContent = gr.toFixed(2).replace(/\.?0+$/, ''); $('ra').textContent = Math.round(a) + ' sq ft (' + (a / 10.764).toFixed(1) + ' m²)'; $('rc').textContent = cans; $('rl').textContent = (g * 3.785).toFixed(1) + ' L';
    const pr = n('P'), cost = (p * 5 + pl) * pr; $('rp').textContent = pr ? '$' + cost.toFixed(2) : 'Add a price'
}
$('cf').addEventListener('input', calc); $('u').onchange = () => { const m = $('u').value == 'm';[['L', m ? 4.3 : 14], ['W', m ? 3.7 : 12], ['H', m ? 2.4 : 8]].forEach(([i, v]) => $(i).value = v); calc() }; calc();
const cks = [...document.querySelectorAll('.ck input')]; cks.forEach(c => c.onchange = () => $('pg').value = cks.filter(x => x.checked).length);
