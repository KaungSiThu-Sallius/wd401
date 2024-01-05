<h2>#Configuring Webpack</h2>

<p>Firstly we install webpack-cli with npm. After that webpack.config.json will generated. After that to handle HTML, CSS and Images, we install the following plugins with npm. (html-webpack-plugin, css-loader, mini-css-extract-plugin)</p>
<p>// Code snippet<br></p>
<code>
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isProduction = process.env.NODE_ENV == 'production';
const stylesHandler = MiniCssExtractPlugin.loader;
const config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(\_\_dirname, 'dist'),
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
        template: './index.html',
        }),
    ],
    module: {
        rules: [{
            test: /\.css$/i,
            use: [stylesHandler, 'css-loader'],
        },{
            test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
            type: 'asset',
        },],
        },
    };

    module.exports = () => {
        if (isProduction) {
            config.mode = 'production';
        } else {
            config.mode = 'development';
        }
        return config;
    };

</code>

<h2>#Advanced Bundling Techniques</h2>

<h4>Code Splitting and Lazy Loading</h4>

<p>To demonstrate this, I created two files, printHello.js and printWorld.js</p>
<p>In printHello.js file, I add the following code</p>
<p>
    export default function loadModuleA() {
        console.log('Hello');
    }
</p>
<p>In printWorld.js file, I add the following code</p>
<p>
    export default function loadModuleB() {
        console.log('World');
    }
</p>
<p>Then, in index.js file, I add the following code. To load the above two modules when user is clicking buttons with ids - load-hello-module,load-world-module respectively. In that case, the modules is only loaded only when the user is clicked the button. </p>
<p>
const helloButton = document.getElementById('load-hello-module');
const WroldButton = document.getElementById('load-world-module');

helloButton.addEventListener('click', () => {
import('./printHello')
.then((printHello) => {
printHello.default();
})
.catch((error) => {
console.error('Error loading module PrintHello:', error);
});
});

helloButton.addEventListener('click', () => {
import('./printWorld')
.then((printWorld) => {
printWorld.default();
})
.catch((error) => {
console.error('Error loading module PrintWorld:', error);
});
});

</p>

<p>We can also configure webpack to split chunks for better caching and optimization. It generates separate files for common dependencies shared between modules. </p>
<p>
Example:
<br>
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
</p>

<p>
In the index.js file, when the buttons are clicked, we use dynamic imports (import()) to load helloModule and worldModule. Webpack detects these dynamic imports and generates separate chunks for each module.
Modules are loaded when the buttons are clicked, allowing users to interact with the main application without waiting for all modules to load. This reduces the initial load time of the application.
</p>

<h4>Benefits</h4>
<p>Initial loading time for web page is improved since only necessary modules are loaded. Smaller initial bundle size, resulting in faster rendering. Better caching and reuse of common dependencies across multiple chunks, optimizing loads.
</p>

<h2>#Introduction to Import Maps</h2>
<p>Import Maps map module specifiers to actual URLs, making it easier to load and organize code. They allow developers to define mappings between module names and their corresponding locations, eliminating the need for bundling or transpilation during development.</p>

<h4>Advantages over traditional bundling approaches</h4>

<ol>
<li>Import Maps allow users to work with individual modueles during development.</li>
<li>Modules can be loaded at runtime so it reduce the inital loading time by fetching the required modules as needed. This can improved performance.</li>
<li>Import Maps allow us to implement third party modules and libraries inside the project.</li>
</ol>

<h4>Implementing Import Maps</h4>
<ol>
<li>First, we create import-map.json file.</li>
<li>In import-map.json file, we write the following code, which map the axios modules with its axios and its actual URL <br>
{
    "imports": {
    "axios": "https://cdnjs.cloudflare.com/ajax/libs/axios/1.6.3/axios.min.js"
    }
}
</li>
<li>
In html file, we link the import-map.json file - < script type="import-map" src="import-map.json"></>
</li>
</ol>

<h4>Compatibility issues or limitations encountered across different browsers</h4>
<ol>
<li>Incompatible in some browser becasue of limited support</li>
<li>Since we can implement from external modules, some security concern can arise as it relies on external factors.</li>
<li>In larger projects, we have to be careful for maintenance and debugging</li>
</ol>

<h4>The refactor of an existing project to use import maps for JS modules</h4>
<p>In index.html (Before using Import Map), we have write actual url in script tag.</p>
<code>
    <script type="module">
        import dayjs from "https://cdn.skypack.dev/dayjs@1.10.7";

        console.log(dayjs('2024-01-05').format('YYYY-MM-DD'));
    </script>

</code>

<p>In index.html (After using Import Map), we just have use the name in script tag.</p>
<code>
    <script type="importmap">
    {
    "imports": {
        "dayjs": "https://cdn.skypack.dev/dayjs@1.10.7",
    }
    }
    </script>
    <script type="module">
        import dayjs from "dayjs";

        console.log(dayjs('2024-01-05').format('YYYY-MM-DD'));
    </script>

</code>
