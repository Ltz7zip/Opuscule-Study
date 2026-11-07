import { useEffect, useState } from 'react';
import { fetchGraph, fetchSubjects } from './api';

const NODE_W = 128;
const NODE_H = 44;

function normalizeGraph(graph) {
  const concepts = {};
  const ids = [];
  (graph.nodes || []).forEach((node) => {
    concepts[node.slug] = {
      id: node.slug,
      zh: node.title?.zh || node.slug,
      en: node.title?.en || node.title?.zh || node.slug,
      def: node.definition?.zh || '',
      defEn: node.definition?.en || node.definition?.zh || '',
      field: node.field || 'math',
      x: node.x || 0,
      y: node.y || 0,
      w: NODE_W,
      h: NODE_H,
      pre: [],
      usedBy: []
    };
    ids.push(node.slug);
  });

  const edges = [];
  (graph.edges || []).forEach((edge) => {
    const source = concepts[edge.source];
    const target = concepts[edge.target];
    if (!source || !target) return;
    if (!target.pre.includes(edge.source)) target.pre.push(edge.source);
    if (!source.usedBy.includes(edge.target)) source.usedBy.push(edge.target);
    edges.push({ id: `${edge.source}-${edge.target}`, from: edge.source, to: edge.target });
  });

  return { concepts, ids, edges };
}

function normalizeSubjects(rows) {
  return (rows || []).map((row, index) => ({
    slug: row.slug,
    code: row.code,
    id: row.slug,
    zh: row.title?.zh || row.slug,
    en: row.title?.en || row.title?.zh || row.slug,
    desc: row.desc?.zh || '',
    descEn: row.desc?.en || row.desc?.zh || '',
    tag: row.tag || '',
    textbook: row.textbook || '',
    status: row.status || 'outline',
    modes: row.modes || ['mastery'],
    ordinal: index,
    concepts: row.counts?.concepts || 0,
    units: row.counts?.units || 0,
    lessons: row.counts?.lessons || 0,
    unitList: (row.units || []).map((unit) => ({
      slug: unit.slug,
      ordinal: unit.ordinal,
      zh: unit.title?.zh || unit.slug,
      en: unit.title?.en || unit.title?.zh || unit.slug,
      lessons: (unit.lessons || []).map((lesson) => ({
        slug: lesson.slug,
        path: lesson.path,
        ordinal: lesson.ordinal,
        zh: lesson.title?.zh || lesson.slug,
        en: lesson.title?.en || lesson.title?.zh || lesson.slug,
        modes: lesson.modes || {},
        concepts: (lesson.concepts || []).map((c) => c.slug)
      }))
    }))
  }));
}

export function useCatalogData() {
  const [state, setState] = useState({
    status: 'loading',
    error: null,
    subjects: [],
    concepts: {},
    ids: [],
    edges: []
  });

  useEffect(() => {
    let alive = true;
    Promise.all([fetchSubjects({ expand: true }), fetchGraph()])
      .then(([subjects, graph]) => {
        if (!alive) return;
        setState({
          status: 'ready',
          error: null,
          subjects: normalizeSubjects(subjects),
          ...normalizeGraph(graph)
        });
      })
      .catch((error) => {
        if (!alive) return;
        setState((prev) => ({ ...prev, status: 'error', error }));
      });
    return () => { alive = false; };
  }, []);

  return state;
}
