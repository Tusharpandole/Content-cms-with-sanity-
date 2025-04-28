import { defineType, defineField, defineArrayMember } from "sanity";

export const imageSlider = defineType({
  name: "imageSlider",
  type: "document",
  title: "Image Slider",
  fields: [
    defineField({
      name: "slides",
      title: "Slides",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: {
            hotspot: true, // Enable hotspot for image cropping
          },
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required().min(1), // Ensure at least one image
    }),
  ],
  preview: {
    select: {
      slides: "slides",
    },
    prepare({ slides }) {
      return {
        title: "Image Slider",
        subtitle: `${slides?.length || 0} slide(s)`,
      };
    },
  },
});