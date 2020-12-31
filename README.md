# Project App

The tool for people to collaborate on shared ideas. Everyone can create and publish their projects and everyone can engage in cocreation of them. It can be used to better understand each other and synchronize our intentions in order to reach common goals.

This app is intended to be fast, reliable and free. So it's developed only by those who are passionate about the new level of social collaboration. Like social media creates chaos in our heads with their smart feeds with huge amount of ads, the Project App can put structure to our ideas and deeds with a particular project realization model. Structured project info can help people connect, mutually coordinate and collaborate in a new more intense but fun way. 

## STACK
- [TypeScript](https://www.typescriptlang.org/) in all use functions for Composition API
- [Vue 3](https://v3.vuejs.org/) as fast and easy to reactive framework with the new powerful Composition API
  - [Vue router](https://github.com/vuejs/vue-router-next) for page routing
  - [i18n](https://vue-i18n-next.intlify.dev/advanced/composition.html#basic-usage) **TBD**
  - [VueUse](https://vueuse.js.org) helpers **TBD**
- [Vite](https://github.com/vitejs/vite) as the fast development environment with modular bundling, with magic plugins by [Antifu](https://github.com/antfu)
  - [voie](https://github.com/vamplate/vite-plugin-voie)  enables file system based routing (all routes are parsed from file structure under the *./src/pages* folder) **done**
  - [vite-plugin-components](https://github.com/antfu/vite-plugin-components) automatically import components from *./src/components* **done**
  - [purgeIcons](https://github.com/antfu/purge-icons) **done** with [Icônes](https://icones.js.org/) VS code extension for fast icons workflow
  - [vite-plugin-md](https://github.com/antfu/vite-plugin-md) may be used for static pages... **TBD**
  - [vite-plugin-pwa](https://github.com/antfu/vite-plugin-pwa) for PWA offline experience **TBD** [Issue with inline GUN](https://github.com/antfu/vite-plugin-pwa/issues/10) to be solved.
- [GUN](https://gun.eco/) for the reactive p2p graph database
- [timeago-js](https://www.npmjs.com/package/timeago.js) to render short dates
- [color-hash](https://www.npmjs.com/package/color-hash) to get colors for item UUIDs
- [image-compressor](https://www.npmjs.com/package/image-compressor) to create small user avatars
- [remarkable](https://www.npmjs.com/package/remarkable) for MarkDown parsing

## Basic structure

It's one of the most difficult questions. I'm in the process of formulating the exact structure. We have so much data about the process, that it's hard to condence all that into one source of truth. And it's definitely not a regular tree, but a complex graph of relations. Let's try.


- design
  - project
- project
  - object
  - event
- event
  - task
  - purchase
- object
  - task
  - purchase
- task
  - tool
  - material
  - result
- purchase
  - quality
  - quantity
  - thing
- course
  - class
- page
  - comment


It's the most basic structure, but it's needs to be filled with all field and relations schema. A lot of work, but how interesting it is!

If you have any ideas or proposals – feel free to create an issue or send me a message. 

## Features

- [x] Feed columns as the main interface
  - [x] Universal items feeds
    - [x] List sorter in a Web Worker
    - [x] Filter by search
    - [x] Filter feed by ratings
  - [ ] Users feeds
- [ ] Item editor
  - [x] Basic item creation 
  - [x] Title input
  - [x] editors embedded in the item page entities themselves
- [ ] Full rating system
  - [x] global rating sort
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
    - [ ] Data: Date.now() : "String"
  - [ ] comment
  - [ ] qna
  - [ ] ukt
  - [ ] parent
    - [x] parent in path
    - [x] parent edit -> select
    - [ ] actually transfer parent between user's items
  - [ ] status
- [ ] comments
- [ ] User
  - [ ] roles
  - [x] page


## Inspiration found
- [Notes](https://notes.andymatuschak.org/) by Andy Matuschak
- 