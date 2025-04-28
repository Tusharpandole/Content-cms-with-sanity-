// src/sanity/post.ts
import {defineType,defineField , defineArrayMember} from 'sanity'   


export const post = defineType({
    name: 'post',
    type: 'document',
    title: 'Post Doc',
    fields: [
      defineField({
        name: 'title',
        type: 'string',
        title: 'Post Title',
        description :'Title of the post ',
        validation : Rule => Rule.required(),
      }),

      //slud filed :

      defineField({
        name: 'slug',
        type: 'slug',
        title: 'Slug',
        description :'Slug of the post ',
        options: {
          source: 'title',
          maxLength: 96,
        },
        validation: (Rule) => Rule.required(),
      }),
        defineField({
            name: 'Summary',
            type: 'text',
            title: 'Summary',
            validation : Rule => Rule.required(),
        }),
        defineField({
            name : "image",
            type : "image",
            title : "Image",
        }),
        defineField({
            name : 'content',
            type : 'array',
            title : 'Content',
            of :[
                defineArrayMember({
                    type : 'block'
                })
            ]

        })
    ],
  }
)
  