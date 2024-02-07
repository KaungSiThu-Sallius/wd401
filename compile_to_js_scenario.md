<h2>#Comparative Analysis</h2>

<h5>TypeScript</h5>
<p>
TypeScript is famous for its static typing, can show error as early as possible and provide code clearity. Moreover, Typescript provide better tooling support compare to Babel. It also improved code organization and refactoring capabilities. We usually use Typescript when we are developing large-scale projects, have complex logic and impove developer productivity.
</p>

<h5>Babel</h5>
<p>
Babel usually rely on external tools. It can catch error on runtime. However, it lacks built-in typing. Babel provides flexibility in using modern JS features with transpilation to target older browsers. We usually use Babel when targeting older browsers, integrating existing JS codebases, or needing specific transpilation capabilities.
</p>

<h2>#Project Conversion</h2>
<p>
When we convert JS project(react) to Typescript project, we ususally have to change the file type jsx to tsx. We also need to install the Typescript package if it hasn't installed yet. After that we can start add the type of data in the project files according to our needs. It improved code quality for example - if we use typescript type in function parameter, the IDE will give warning if we add wrong type arguments. </p>
<p>// Code snippet<br></p>
<code>
// Before:
function add(firstNum, secondNum) {
  return firstNum + secondNum;
}

// After:
function add(firstNum: number, secondNum: number): number {
return firstNum + secondNum;
}
</code>

<p>In above example, we give number type to two parameter and also give the return type to number which means the function has to return the number data type.</p>

<h2>#Babel Configuration</h2>
<p>First, we have to install the following - npm install --save-dev babel-preset-es2015 babel-plugin-transform-es2015-classes</p>
<p>After we have to add presents in .babelrc file - </p>
<code>
 {
    "presets": [
        "es2015"
    ],
    "plugins": [
        "transform-es2015-classes"
        "transform-runtime",
    ]
  }
</code>
<p>We should also install babel-runtime package to add helpers mehtod which is very long at the top of every files so that we can move them into a single runtime which gets required. cmd - npm install --save-dev babel-plugin-transform-runtime, npm install --save babel-runtime</p>

<h2>#Case Study Presentation</h2>

<p>For large project TypeScript will be dominant compare to using Babel. Because it scales well and enhances maintainbaility. But the team need to be expert and its learning curve is steep. For maintainbility, Typescirpt is very realiable since it is highly adopted language.</p>

<p>For small project, Bable will give more flexibility rather than Typescirpt. Due to its simplified concept and gentle learning curve, developer with limited experience will easy to follow along. For maintainbility, its communitiy also is large so don't to worry about long term support,</p>

<h2>Advanced TypeScript Features</h2>

<h5>Recipe Instruction Project</h5>
<p>This code manages recipes with ingredients, instructions. We'll use decorators for logging and generics for a reusable component.</p> 
<code>
@logRecipeDetails
class Recipe {
  public name: string;
  public ingredients: string[];
  public instructions: string[];

constructor(name: string, ingredients: string[], instructions: string[]) {
this.name = name;
this.ingredients = ingredients;
this.instructions = instructions;
console.log(`New recipe created: ${this.name}`);
}

@logRecipeDetails
public updateInstructions(newInstructions: string[]) {
this.instructions = newInstructions;
console.log(`Recipe "${this.name}" instructions updated.`);
}

}

function logRecipeDetails(target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
const originalMethod = descriptor.value;
descriptor.value = function(...args: any[]) {
console.log(`Recipe "${this.name}" details before ${propertyKey}:`);
console.log(this);

    const result = originalMethod.apply(this, args);

    console.log(`Recipe "${this.name}" details after ${propertyKey}:`);
    console.log(this, propertyKey === 'constructor' ? "New recipe created." : "Instructions updated.");
    return result;

};
}
</code>

<code>
class RecipeCollection<T extends RecipeData> {
  private items: T[] = [];

public addRecipe(recipe: T) {
this.items.push(recipe);
}

public getRecipeByName(name: string): T | undefined {
return this.items.find(recipe => recipe.name === name);
}

public getAllRecipes(): T[] {
return this.items.slice(); // Return a copy
}
}

const dessertRecipes = new RecipeCollection<DessertData>();
const mainCourseRecipes = new RecipeCollection<MainCourseData>();
</code>

<h5>Best Practices</h5>
<p>
For Decorators, due to performance and readability concerns we should consider alternatives concept.
We should avoid circular dependencies between decorated elements.
For Generics, we use it to define clear type constraints to produce desired behavior.
We should prefer built-in utility types when possible. Moreover, avoid complex generic interfaces that are hard to understand.
</p>
