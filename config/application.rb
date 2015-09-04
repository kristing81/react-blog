require File.expand_path('../boot', __FILE__)

require "rails/all"

Bundler.require(*Rails.groups)

module ReactBlog
  class Application < Rails::Application
    # Use the responders controller from the responders gem
    config.app_generators.scaffold_controller :responders_controller

    config.middleware.insert_before 'Rack::Runtime', 'Rack::Cors' do
      allow do
        origins '*'
        resource '*',
                 headers: :any,
                 methods: [:get, :put, :post, :patch, :delete, :options]
      end
    end
    config.active_record.raise_in_transactional_callbacks = true
    config.react.max_renderers = 10
    config.react.timeout = 20
    config.react.react_js = lambda { File.read(::Rails.application.assets.resolve('react.js')) }
    config.react.component_filenames = ['components.js']
    config.react.replay_console = false
  end
end
