import { defineType, defineField, defineArrayMember } from 'sanity';

export const subscriptionPlan = defineType({
  name: 'subscriptionPlan',
  type: 'document',
  title: 'Subscription Plan',
  fields: [
    // Background Photo
    defineField({
      name: 'backgroundPhoto',
      type: 'image',
      title: 'Background Photo',
      description: 'Background image for the subscription plan page',
      options: {
        hotspot: true,
      },
    }),
    defineField({
        name: 'slug',
        type: 'slug',
        title: 'Slug',
        description :'Slug of the post ',
        options: {
          source: 'brandName',
          maxLength: 96,
        },
        validation: (Rule) => Rule.required(),
      }),

    // Brand Name
    defineField({
      name: 'brandName',
      type: 'string',
      title: 'Brand Name',
      description: 'Name of the brand (e.g., Sony LIV via Fleek)',
      validation: Rule => Rule.required(),
    }),

    // Brand Logo
    defineField({
      name: 'brandLogo',
      type: 'image',
      title: 'Brand Logo',
      description: 'Logo of the brand',
      options: {
        hotspot: true,
      },
    }),

    // Content
    defineField({
      name: 'content',
      type: 'array',
      title: 'Content',
      description: 'Main content of the subscription plan page',
      of: [
        defineArrayMember({
          type: 'block',
        }),
      ],
    }),

    // Discount Info
    defineField({
      name: 'discountInfo',
      type: 'object',
      title: 'Discount Info',
      description: 'Details about any discounts for the subscription plans',
      fields: [
        defineField({
          name: 'discountCode',
          type: 'string',
          title: 'Discount Code',
        }),
        defineField({
          name: 'maxDiscountPercentage',
          type: 'number',
          title: 'Maximum Discount Percentage',
          description: 'Maximum discount percentage (e.g., 50 for 50%)',
          validation: Rule => Rule.required().min(0).max(100),
        }),
      ],
    }),

    // List of Plans with Radio Option (Dynamic Number of Plans)
    // Inside the subscriptionPlan fields array
defineField({
    name: 'plans',
    type: 'array',
    title: 'Subscription Plans',
    description: 'List of available subscription plans (add as many plans as needed)',
    of: [
      defineArrayMember({
        type: 'object',
        name: 'plan',
        title: 'Plan',
        fields: [
          defineField({
            name: 'name',
            type: 'string',
            title: 'Plan Name',
            description: 'Name of the plan (e.g., Premium - 12 Months)',
            validation: Rule => Rule.required(),
          }),
          defineField({
            name: 'originalPrice',
            type: 'number',
            title: 'Original Price',
            description: 'Original price in ₹ before discount',
            validation: Rule => Rule.required().min(0),
          }),
          defineField({
            name: 'discountedPrice',
            type: 'number',
            title: 'Discounted Price',
            description: 'Discounted price in ₹',
            validation: Rule => Rule.required().min(0),
          }),
          defineField({
            name: 'duration',
            type: 'string',
            title: 'Duration',
            description: 'Duration of the plan (e.g., "12 months")',
            validation: Rule => Rule.required(),
          }),
          defineField({
            name: 'isAvailable',
            type: 'boolean',
            title: 'Availability',
            description: 'Whether the plan is currently available',
            initialValue: true,
          }),
          defineField({
            name: 'benefits',
            type: 'array',
            title: 'Plan Benefits',
            description: 'Benefits of this plan (displayed as bullet points)',
            of: [
              defineArrayMember({
                type: 'string',
              }),
            ],
            initialValue: [
              'Get full access to all SonyLIV originals, live sports, blockbuster movies, and international shows for a whole year.',
              'Enjoy ad-free streaming and offline downloads at 50% off when you subscribe through Fleek!',
            ],
          }),
          defineField({
            name: 'activationInfo',
            type: 'string',
            title: 'Activation Info',
            description: 'Information about how to activate the plan (e.g., coupon details)',
            initialValue: "You'll receive a coupon to activate.",
          }),
        ],
      }),
    ],
  }),
    // Terms and Conditions List
    defineField({
      name: 'termsAndConditions',
      type: 'array',
      title: 'Terms and Conditions',
      description: 'List of terms and conditions for the subscription',
      of: [
        defineArrayMember({
          type: 'string',
        }),
      ],
      initialValue: [
        'If an active plan already exists then new plan CANNOT be purchased/extended.',
        'Once the subscription is purchased it cannot be returned/canceled.',
        'The person who bought the subscription is deemed to be the beneficiary.',
        'The Subscription will be activated on the Fleek registered number.',
      ],
    }),

    // Summary of the Platform
    defineField({
      name: 'platformSummary',
      type: 'text',
      title: 'Platform Summary',
      description: 'A summary of the platform (e.g., what Fleek offers with Sony LIV)',
      validation: Rule => Rule.required(),
    }),

    // Benefits with Fleek Dropdown
    defineField({
      name: 'benefits',
      type: 'array',
      title: 'Benefits with Fleek',
      description: 'List of benefits (each item can be expanded in a dropdown)',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'benefit',
          title: 'Benefit',
          fields: [
            defineField({
              name: 'title',
              type: 'string',
              title: 'Benefit Title',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'description',
              type: 'text',
              title: 'Benefit Description',
              description: 'Details about this benefit (shown when expanded)',
            }),
          ],
        }),
      ],
      initialValue: [
        {
          title: 'Easy Subscription Management',
          description: 'Fleek is your one-stop marketplace for subscriptions, leaving you zero stress when it comes to managing and paying for subscriptions.',
        },
      ],
    }),

    // FAQ Questions with Dropdown
    defineField({
      name: 'faqs',
      type: 'array',
      title: 'FAQs',
      description: 'List of FAQs (each question can be expanded to show the answer)',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'faq',
          title: 'FAQ',
          fields: [
            defineField({
              name: 'question',
              type: 'string',
              title: 'Question',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'answer',
              type: 'text',
              title: 'Answer',
              description: 'Answer to the question (shown when expanded)',
              validation: Rule => Rule.required(),
            }),
          ],
        }),
      ],
      initialValue: [
        {
          question: 'How do I get a discount on Sony LIV subscription?',
          answer: 'Visit Fleek and select your SonyLIV subscription plan. Apply a SonyLIV subscription coupon code at checkout. Enjoy your SonyLIV free subscription (if applicable) or get instant coupon discounts on paid plans!',
        },
        {
          question: 'Is there any offer for SonyLiv?',
          answer: 'When Fleek says discounts on subscriptions, you best believe they mean it! The SonyLiv subscription price comes with an upto 50% discount on Fleek.',
        },
        {
          question: 'Does Sony LIV have a free trial?',
          answer: 'Yes, SonyLiv offers a 30-day free trial before you decide to pay for your subscription. If you feel like the subscription pack chosen isn\'t for you, you can cancel the trial at any time during the trial period.',
        },
        {
          question: 'What are the benefits of Sony liv subscription with Fleek?',
          answer: 'Fleek is your one-stop marketplace for subscriptions leaving you zero stress when it comes to managing and paying for subscriptions. You not only get great discounts and deals on subscriptions, but you can also manage them easily with ease. SonyLiv subscriptions with Fleek come with an exclusive discount of upto 50% off, when using Fleekcoin.',
        },
        {
          question: 'Which plan is best for Sony liv?',
          answer: 'The best plan depends on your needs. The Premium - 12 Months plan offers the best value at ₹749 after a ₹750 discount, while the 1 Month and 6 Months plans (₹399 and ₹699) are ideal for shorter commitments.',
        },
      ],
    }),
  ],
});