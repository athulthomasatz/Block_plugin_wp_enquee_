<?php
/**
 * Plugin Name: Simple Custom Block
 * Description: A simple custom block plugin using JSX
 * Version: 1.0.
 * Author: Your Name
 * Text Domain: simple-custom-block
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class SimpleCustomBlock {
   
    public function __construct() {
        add_action('init', array($this, 'register_block'));
        add_action('enqueue_block_editor_assets', array($this, 'enqueue_editor_assets'));
    }
    
    public function register_block() {
        // Register the block using block.json
        register_block_type(
            plugin_dir_path(__FILE__) . 'block.json',
            array(
                'render_callback' => array($this, 'render_block')
            )
        );
    }
    
    public function enqueue_editor_assets() {
        // Enqueue the block editor script
        wp_enqueue_script(
            'simple-custom-block-editor',
            plugins_url('build/index.js', __FILE__),
            array('wp-blocks', 'wp-i18n', 'wp-element', 'wp-components', 'wp-block-editor'),
            filemtime(plugin_dir_path(__FILE__) . 'build/index.js')
        );
        
        // Enqueue editor styles
        wp_enqueue_style(
            'simple-custom-block-editor-style',
            plugins_url('src/editor.css', __FILE__),
            array('wp-edit-blocks'),
            filemtime(plugin_dir_path(__FILE__) . 'src/editor.css')
        );
        
        // Enqueue frontend styles
        wp_enqueue_style(
            'simple-custom-block-style',
            plugins_url('src/style.css', __FILE__),
            array(),
            filemtime(plugin_dir_path(__FILE__) . 'src/style.css')
        );
    }
    
    public function render_block($attributes) {
        $title = esc_html($attributes['title']);
        $subtitle = esc_html($attributes['subtitle']);
        $buttonText = esc_html($attributes['buttonText']);
        $buttonUrl = esc_url($attributes['buttonUrl']);
        $backgroundColor = esc_attr($attributes['backgroundColor']);
        $textColor = esc_attr($attributes['textColor']);
        
        ob_start();
        ?>
        <div class="wp-block-simple-custom-block-hero-section" style="background-color: <?php echo $backgroundColor; ?>; color: <?php echo $textColor; ?>;">
            <div class="hero-content">
                <h2 class="hero-title"><?php echo $title; ?></h2>
                <p class="hero-subtitle"><?php echo $subtitle; ?></p>
                <?php if (!empty($buttonText)) : ?>
                    <a href="<?php echo $buttonUrl; ?>" class="hero-button">
                        <?php echo $buttonText; ?>
                    </a>
                <?php endif; ?>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }
}

// Initialize the plugin
new SimpleCustomBlock();
?>