# Project App 

The tool for people to collaborate on shared ideas. Everyone can create and publish their projects and everyone can engage in cocreation of them. It can be used to better understand each other and synchronize our intentions in order to reach common goals.

This app is intended to be fast, reliable and free. So it's developed only by those who are passionate about the new level of social collaboration. Like social media creates chaos in our heads with their smart feeds with huge amount of ads, the Project App can put structure to our ideas and deeds with a particular project realization model. Structured project info can help people connect, mutually coordinate and collaborate in a new more intense but fun way. 

[repo](https://github.com/DeFUCC/project-app)

## STACK
- [TypeScript](https://www.typescriptlang.org/) 
- [Vue 3](https://v3.vuejs.org/) 
  - [Vue router](https://github.com/vuejs/vue-router-next) for page routing [docs](https://next.router.vuejs.org/)
  - [i18n](https://vue-i18n-next.intlify.dev/) internationalization via global yaml files
  - [VueUse](https://vueuse.js.org) helpers 
    - `useTitle()` for page title manipulations
- [Vite 2](https://vitejs.dev/) as the fast development environment with modular bundling, with magic plugins by [Antfu](https://github.com/antfu)
  - [voie](https://github.com/vamplate/vite-plugin-voie)  enables file system based routing (all routes are parsed from file structure under the *./src/pages* folder) 
  - [vite-plugin-components](https://github.com/antfu/vite-plugin-components) automatically import components from *./src/components* **done**
  - [purgeIcons](https://github.com/antfu/purge-icons) with [Icônes](https://icones.js.org/) VS code extension for fast icons workflow
  - [vite-plugin-md](https://github.com/antfu/vite-plugin-md) for static pages in docs 
  - -[vite-plugin-vue-i18n](https://github.com/intlify/vite-plugin-vue-i18n) to improve i18n features in sfcs
  - [vite-plugin-pwa](https://github.com/antfu/vite-plugin-pwa) for PWA offline experience **TBD** [Issue with inline scripts](https://github.com/antfu/vite-plugin-pwa/issues/10) to be solved.
- [GUN](https://gun.eco/) for the reactive p2p graph database
  - with a free peer at [Glitch.com](https://glitch.com/edit/#!/gun-feeds)
- [color-hash](https://www.npmjs.com/package/color-hash) to get colors for item UUIDs
- [image-compressor](https://www.npmjs.com/package/image-compressor) to compress images to store them as base64 strings in the db
- [remarkable](https://www.npmjs.com/package/remarkable) for MarkDown parsing


## Features

- [x] Feed columns as the main interface
  - [x] Universal items feeds
    - [x] List sorter in a Web Worker
    - [x] Filter by search
    - [x] Filter feed by ratings
  - [x] Users feeds
- [x] Item edit
  - [x] Basic item creation 
  - [x] Title edit
  - [x] editors embedded in the item page entities themselves
- [ ] Full rating system
  - [-] global rating sort //needs to be optimized
    - [x] star
    - [x] seen
    - [x] trash
  - [x] 3 types
    - [x] star
    - [x] seen
    - [x] trash
  - [ ] User rating pages
    - [x] My Stars
    - [ ] My Seen
    - [ ] My Trash
- [ ] UKT rating
- [ ] item page features
  - [x] log
    - [x] log item changes
    - [ ] log events
    - [x] Data: Date.now() : "String"
  - [ ] qna
  - [ ] ukt
  - [x] parent
    - [x] parent in path
    - [x] parent edit -> select
    - [ ] actually transfer parent between user's items
  - [x] status
- [x] comments
- [ ] User
  - [ ] roles
  - [x] page
  - [x] Docs in markdown
- [ ] Teams
  - [ ] 


## Inspiration found
- [Notes](https://notes.andymatuschak.org/) by Andy Matuschak
- [Gun-iris starter page](https://gun-iris.herokuapp.com) by Marti Malmi


### SEA.Certify **TBD**
The problem for now is the uncertainty of GUN versions and problems with using it with vite. Certify is available in recent gun version from git repo, but it has `vite.config.ts` for some reason... Will try again later.

```
item - team - pub - certificate

page: user.is ??? user.is.pub == id.slice(88) || team[user.is.pub]
```
https://gun.eco/docs/SEA#certify
https://gun.eco/docs/SEA.Certify

