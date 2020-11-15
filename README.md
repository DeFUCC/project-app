# Project App

The tool for people to collaborate on shared ideas. Everyone can create and publish their projects and everyone can engage in cocreation of them. It can be used to better understand each other and synchronize our intentions in order to reach common goals.

This app is intended to be fast, reliable and free. So it's developed only by those who are passionate about the new level of social collaboration. Like social media creates chaos in our heads with their clever feeds with huge amount of ads, the Project App can give structure to our ideas and deeds with a particular project schema. Structured project info can help people connect, mutually coordinate and collaborate in a new more intense way. 

## Basic tools

The app barely started, but after a couple of insucessful attempts, I know about the importance of good foundation for the project. Code splitting is the most important way to deal with evergrowing complexity.

So at the base we have:
- Vite for the fast development environment with modular bundling
- Vue 3 as it's fast and easy to use without JSX and other CSS-in-JS maddness 😅
- GUN for the reactive p2p graph database
- and some other libraries, check the package.json and index.html

## Basic structure

It's one of the most difficult questions. I'm in the process of formulating the exact structure. We have so much data about the process, that it's hard to condence all that into ine source of truth. And it's definitely not a regular tree, but a complex graph of relations. But let's try.

```
Designs
    Design
        Ideas
            Idea
        Projects
            Project
                Status
                Purposes
                    Purpose
                Events
                    Event
                Objects
                    Object
                Opportunities
                    Opportunity     
                Tasks
                    Task
                        Tools
                            Tool
                        Matrials
                            Material
                        Results
                            Result
                Purchases
                    Purchase
                        Tools
                            Tool
                        Matrials
                            Material
                Updates
                    Update
                Comments
                    Comment
                Enhancements
                    Enhancement
                Results
                    Result
                Presentations
                    Presentation                
```

It's the most basic structure, but it's needs to be filled with all field and relations schema. A lot of work, but how interesting it is!

If you have any ideas or proposals – feel free to create an issue or send me a message. 