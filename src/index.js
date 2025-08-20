import { registerBlockType } from '@wordpress/blocks';
import edit from './edit';
import save from './save';

// Register the block (metadata comes from block.json)
registerBlockType('simple-custom-block/hero-section', {
    "parent": ["woocommerce/checkout-fields-block"],
    edit,
    save,
});