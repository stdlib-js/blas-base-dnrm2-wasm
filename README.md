<!--

@license Apache-2.0

Copyright (c) 2024 The Stdlib Authors.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

-->


<details>
  <summary>
    About stdlib...
  </summary>
  <p>We believe in a future in which the web is a preferred environment for numerical computation. To help realize this future, we've built stdlib. stdlib is a standard library, with an emphasis on numerical and scientific computation, written in JavaScript (and C) for execution in browsers and in Node.js.</p>
  <p>The library is fully decomposable, being architected in such a way that you can swap out and mix and match APIs and functionality to cater to your exact preferences and use cases.</p>
  <p>When you use stdlib, you can be absolutely certain that you are using the most thorough, rigorous, well-written, studied, documented, tested, measured, and high-quality code out there.</p>
  <p>To join us in bringing numerical computing to the web, get started by checking us out on <a href="https://github.com/stdlib-js/stdlib">GitHub</a>, and please consider <a href="https://opencollective.com/stdlib">financially supporting stdlib</a>. We greatly appreciate your continued support!</p>
</details>

# dnrm2

[![NPM version][npm-image]][npm-url] [![Build Status][test-image]][test-url] [![Coverage Status][coverage-image]][coverage-url] <!-- [![dependencies][dependencies-image]][dependencies-url] -->

> Calculate the L2-norm of a double-precision floating-point vector.



<section class="usage">

## Usage

To use in Observable,

```javascript
dnrm2 = require( 'https://cdn.jsdelivr.net/gh/stdlib-js/blas-base-dnrm2-wasm@umd/browser.js' )
```

To vendor stdlib functionality and avoid installing dependency trees for Node.js, you can use the UMD server build:

```javascript
var dnrm2 = require( 'path/to/vendor/umd/blas-base-dnrm2-wasm/index.js' )
```

To include the bundle in a webpage,

```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/stdlib-js/blas-base-dnrm2-wasm@umd/browser.js"></script>
```

If no recognized module system is present, access bundle contents via the global scope:

```html
<script type="text/javascript">
(function () {
    window.dnrm2;
})();
</script>
```

#### dnrm2.main( N, x, strideX )

Calculates the L2-norm of a double-precision floating-point vector.

```javascript
var Float64Array = require( '@stdlib/array-float64' );

var x = new Float64Array( [ 1.0, -2.0, 2.0 ] );

var z = dnrm2.main( 3, x, 1 );
// returns 3.0
```

The function has the following parameters:

-   **N**: number of indexed elements.
-   **x**: input [`Float64Array`][@stdlib/array/float64].
-   **strideX**: index increment for `x`.

The `N` and stride parameters determine which elements in the input strided array are accessed at runtime. For example, to compute the L2-norm of every other element in `x`,

```javascript
var Float64Array = require( '@stdlib/array-float64' );

var x = new Float64Array( [ 1.0, 2.0, 2.0, -7.0, -2.0, 3.0, 4.0, 2.0 ] );

var z = dnrm2.main( 4, x, 2 );
// returns 5.0
```

Note that indexing is relative to the first index. To introduce an offset, use [`typed array`][mdn-typed-array] views.

<!-- eslint-disable stdlib/capitalized-comments -->

```javascript
var Float64Array = require( '@stdlib/array-float64' );

// Initial array:
var x0 = new Float64Array( [ 2.0, 1.0, 2.0, -2.0, -2.0, 2.0, 3.0, 4.0 ] );

// Create a typed array view:
var x1 = new Float64Array( x0.buffer, x0.BYTES_PER_ELEMENT*1 ); // start at 2nd element

var z = dnrm2.main( 4, x1, 2 );
// returns 5.0
```

#### dnrm2.ndarray( N, x, strideX, offsetX )

Calculates the L2-norm of a double-precision floating-point vector using alternative indexing semantics.

```javascript
var Float64Array = require( '@stdlib/array-float64' );

var x = new Float64Array( [ 1.0, -2.0, 2.0 ] );

var z = dnrm2.ndarray( 3, x, 1, 0 );
// returns 3.0
```

The function has the following additional parameters:

-   **offsetX**: starting index for `x`.

While [`typed array`][mdn-typed-array] views mandate a view offset based on the underlying buffer, the offset parameter supports indexing semantics based on a starting index. For example, to calculate the L2-norm for every other value in `x` starting from the second value,

```javascript
var Float64Array = require( '@stdlib/array-float64' );

var x = new Float64Array( [ 2.0, 1.0, 2.0, -2.0, -2.0, 2.0, 3.0, 4.0 ] );

var z = dnrm2.ndarray( 4, x, 2, 1 );
// returns 5.0
```

* * *

### Module

#### dnrm2.Module( memory )

Returns a new WebAssembly [module wrapper][@stdlib/wasm/module-wrapper] instance which uses the provided WebAssembly [memory][@stdlib/wasm/memory] instance as its underlying memory.

<!-- eslint-disable node/no-sync -->

```javascript
var Memory = require( '@stdlib/wasm-memory' );

// Create a new memory instance with an initial size of 10 pages (640KiB) and a maximum size of 100 pages (6.4MiB):
var mem = new Memory({
    'initial': 10,
    'maximum': 100
});

// Create a BLAS routine:
var mod = new dnrm2.Module( mem );
// returns <Module>

// Initialize the routine:
mod.initializeSync();
```

#### dnrm2.Module.prototype.main( N, xp, sx )

Computes the L2-norm of a double-precision floating-point vector.

<!-- eslint-disable node/no-sync -->

```javascript
var Memory = require( '@stdlib/wasm-memory' );
var oneTo = require( '@stdlib/array-one-to' );

// Create a new memory instance with an initial size of 10 pages (640KiB) and a maximum size of 100 pages (6.4MiB):
var mem = new Memory({
    'initial': 10,
    'maximum': 100
});

// Create a BLAS routine:
var mod = new dnrm2.Module( mem );
// returns <Module>

// Initialize the routine:
mod.initializeSync();

// Define a vector data type:
var dtype = 'float64';

// Specify a vector length:
var N = 5;

// Define pointer (i.e., byte offsets) for storing the input vector:
var xptr = 0;

// Write vector values to module memory:
mod.write( xptr, oneTo( N, dtype ) );

// Perform computation:
var out = mod.main( N, xptr, 1 );
// returns ~7.42
```

The function has the following parameters:

-   **N**: number of indexed elements.
-   **xp**: input [`Float64Array`][@stdlib/array/float64] pointer (i.e., byte offset).
-   **sx**: index increment for `x`.

#### dnrm2.Module.prototype.ndarray( N, xp, sx, ox )

Computes the L2-norm of a double-precision floating-point vector using alternative indexing semantics.

<!-- eslint-disable node/no-sync -->

```javascript
var Memory = require( '@stdlib/wasm-memory' );
var oneTo = require( '@stdlib/array-one-to' );

// Create a new memory instance with an initial size of 10 pages (640KiB) and a maximum size of 100 pages (6.4MiB):
var mem = new Memory({
    'initial': 10,
    'maximum': 100
});

// Create a BLAS routine:
var mod = new dnrm2.Module( mem );
// returns <Module>

// Initialize the routine:
mod.initializeSync();

// Define a vector data type:
var dtype = 'float64';

// Specify a vector length:
var N = 5;

// Define pointer (i.e., byte offsets) for storing the input vector:
var xptr = 0;

// Write vector values to module memory:
mod.write( xptr, oneTo( N, dtype ) );

// Perform computation:
var out = mod.ndarray( N, xptr, 1, 0 );
// returns ~7.42
```

The function has the following additional parameters:

-   **ox**: starting index for `x`.

</section>

<!-- /.usage -->

<section class="notes">

* * *

## Notes

-   If `N <= 0`, both `main` and `ndarray` methods return `0.0`.
-   This package implements routines using WebAssembly. When provided arrays which are not allocated on a `dnrm2` module memory instance, data must be explicitly copied to module memory prior to computation. Data movement may entail a performance cost, and, thus, if you are using arrays external to module memory, you should prefer using [`@stdlib/blas-base/dnrm2`][@stdlib/blas/base/dnrm2]. However, if working with arrays which are allocated and explicitly managed on module memory, you can achieve better performance when compared to the pure JavaScript implementations found in [`@stdlib/blas/base/dnrm2`][@stdlib/blas/base/dnrm2]. Beware that such performance gains may come at the cost of additional complexity when having to perform manual memory management. Choosing between implementations depends heavily on the particular needs and constraints of your application, with no one choice universally better than the other.
-   `dnrm2()` corresponds to the [BLAS][blas] level 1 function [`dnrm2`][dnrm2].

</section>

<!-- /.notes -->

<section class="examples">

* * *

## Examples

<!-- eslint no-undef: "error" -->

```html
<!DOCTYPE html>
<html lang="en">
<body>
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/stdlib-js/random-array-discrete-uniform@umd/browser.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/stdlib-js/blas-base-dnrm2-wasm@umd/browser.js"></script>
<script type="text/javascript">
(function () {

var opts = {
    'dtype': 'float64'
};
var x = discreteUniform( 10, 0, 100, opts );
console.log( x );

var out = dnrm2.ndarray( x.length, x, 1, 0 );
console.log( out );

})();
</script>
</body>
</html>
```

</section>

<!-- /.examples -->

<!-- Section for related `stdlib` packages. Do not manually edit this section, as it is automatically populated. -->

<section class="related">

</section>

<!-- /.related -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->


<section class="main-repo" >

* * *

## Notice

This package is part of [stdlib][stdlib], a standard library for JavaScript and Node.js, with an emphasis on numerical and scientific computing. The library provides a collection of robust, high performance libraries for mathematics, statistics, streams, utilities, and more.

For more information on the project, filing bug reports and feature requests, and guidance on how to develop [stdlib][stdlib], see the main project [repository][stdlib].

#### Community

[![Chat][chat-image]][chat-url]

---

## License

See [LICENSE][stdlib-license].


## Copyright

Copyright &copy; 2016-2024. The Stdlib [Authors][stdlib-authors].

</section>

<!-- /.stdlib -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="links">

[npm-image]: http://img.shields.io/npm/v/@stdlib/blas-base-dnrm2-wasm.svg
[npm-url]: https://npmjs.org/package/@stdlib/blas-base-dnrm2-wasm

[test-image]: https://github.com/stdlib-js/blas-base-dnrm2-wasm/actions/workflows/test.yml/badge.svg?branch=main
[test-url]: https://github.com/stdlib-js/blas-base-dnrm2-wasm/actions/workflows/test.yml?query=branch:main

[coverage-image]: https://img.shields.io/codecov/c/github/stdlib-js/blas-base-dnrm2-wasm/main.svg
[coverage-url]: https://codecov.io/github/stdlib-js/blas-base-dnrm2-wasm?branch=main

<!--

[dependencies-image]: https://img.shields.io/david/stdlib-js/blas-base-dnrm2-wasm.svg
[dependencies-url]: https://david-dm.org/stdlib-js/blas-base-dnrm2-wasm/main

-->

[chat-image]: https://img.shields.io/gitter/room/stdlib-js/stdlib.svg
[chat-url]: https://app.gitter.im/#/room/#stdlib-js_stdlib:gitter.im

[stdlib]: https://github.com/stdlib-js/stdlib

[stdlib-authors]: https://github.com/stdlib-js/stdlib/graphs/contributors

[umd]: https://github.com/umdjs/umd
[es-module]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules

[deno-url]: https://github.com/stdlib-js/blas-base-dnrm2-wasm/tree/deno
[deno-readme]: https://github.com/stdlib-js/blas-base-dnrm2-wasm/blob/deno/README.md
[umd-url]: https://github.com/stdlib-js/blas-base-dnrm2-wasm/tree/umd
[umd-readme]: https://github.com/stdlib-js/blas-base-dnrm2-wasm/blob/umd/README.md
[esm-url]: https://github.com/stdlib-js/blas-base-dnrm2-wasm/tree/esm
[esm-readme]: https://github.com/stdlib-js/blas-base-dnrm2-wasm/blob/esm/README.md
[branches-url]: https://github.com/stdlib-js/blas-base-dnrm2-wasm/blob/main/branches.md

[stdlib-license]: https://raw.githubusercontent.com/stdlib-js/blas-base-dnrm2-wasm/main/LICENSE

[blas]: http://www.netlib.org/blas

[dnrm2]: http://www.netlib.org/lapack/explore-html/de/da4/group__double__blas__level1.html

[mdn-typed-array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray

[@stdlib/array/float64]: https://github.com/stdlib-js/array-float64/tree/umd

[@stdlib/wasm/memory]: https://github.com/stdlib-js/wasm-memory/tree/umd

[@stdlib/wasm/module-wrapper]: https://github.com/stdlib-js/wasm-module-wrapper/tree/umd

[@stdlib/blas/base/dnrm2]: https://github.com/stdlib-js/blas-base-dnrm2/tree/umd

</section>

<!-- /.links -->