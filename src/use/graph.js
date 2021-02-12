import { watchEffect, reactive } from 'vue'
import { db, gun, soul } from 'store@gun-db'
import { types } from 'store@model'

export function useGraph() {
  const nodes = reactive([])
  const links = reactive([])
  const options = reactive({
    nodeSize: 12,
    nodeLabels: true,
    linkWidth: 2,
  })
  const colors = {
    design: '#111',
    project: '#aaa',
    object: '#a0a',
    event: '#00a',
    user: '#0ff',
  }

  for (let type of types) {
    db.get(type)
      .map()
      .on((data, key) => {
        if (data && typeof data == 'object' && data.title) {
          if (!nodes.find((node) => node.id == soul(data))) {
            nodes.push({
              name: (data.title || data.description).slice(0, 24),
              id: soul(data),
              type: data.type,
              data: data,
              _color: colors[data.type],
              _cssClass: 'graph-node',
            })
          }
        }
      })
  }

  watchEffect(() => {
    for (let node of nodes) {
      for (let type of types) {
        if (node.data[type]) {
          gun
            .get(node.id)
            .get(type)
            .map()
            .on((data, key) => {
              if (data && nodes.find((n) => n.id == soul(data))) {
                if (
                  !links.find((link) => {
                    return link.source == node.id && link.target == soul(data)
                  })
                ) {
                  links.push({
                    source: node.id,
                    target: soul(data),
                  })
                }
              }
            })
        }
      }
    }
  })

  return {
    nodes,
    links,
    options,
  }
}
