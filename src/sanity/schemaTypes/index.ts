import { type SchemaTypeDefinition } from 'sanity';
import { post } from '../post';
import { author } from '../author';
import { subscriptionPlan } from '../fleekcomponent';
import { imageSlider } from '../sliderimage';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, author ,subscriptionPlan,imageSlider],
};