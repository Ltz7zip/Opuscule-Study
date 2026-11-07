import katex from 'katex';
import 'katex/dist/katex.min.css';

/**
 * 后端把 $...$ / $$...$$ 渲染成带 data-tex 的占位节点，
 * 这里在挂载后把它们交给 KaTeX 排成真正的公式。
 */
export function renderMath(root) {
  if (!root) return;
  root.querySelectorAll('.math-inline, .math-display').forEach((el) => {
    const tex = el.getAttribute('data-tex') || el.textContent || '';
    if (!tex || el.dataset.rendered === '1') return;
    katex.render(tex, el, {
      displayMode: el.classList.contains('math-display'),
      throwOnError: false,
      strict: false,
      output: 'html'
    });
    el.dataset.rendered = '1';
  });
}
