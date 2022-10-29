# Scroll Rise
The typescript library for scroll animation.

[![NPM](https://nodei.co/npm/scroll-rise.png)](https://nodei.co/npm/scroll-rise/)

## Demo

[https://drkaramazin.github.io/scroll-rise/](https://drkaramazin.github.io/scroll-rise/)

## Module System Types

- ES6
- UMD

## Layout methods

- FixedActorsScene
```
const scene = new StickyPlatformScene(
    document.getElementById('scene'),
    (w, h) => h * 2,
);
```
Here is [an example](https://drkaramazin.github.io/scroll-rise/fixed-actors-scene-demo.html) of using this method.

- StickyPlatformScene
```
const scene = new StickyPlatformScene(
    document.getElementById('scene'),
    (w, h) => h * 2,
);
```
This method also has an _offset_ and _stickyPlatformHeight_ options. To see an example of using these options [click here](https://drkaramazin.github.io/scroll-rise/sticky-platform-scene-demo.html).

## Motions
- MoveMotion
- SizeMotion
- OpacityMotion
- BoundMotion

## Actors
- **StaticActor** should have MoveMotion, SizeMotion and OpacityMotion in its TimeFrame to calc start/end values. You can also set false into _initPosition_, _initSize_, _initOpacity_ to prevent this behavior:
```
const agenda = new StaticActor(document.getElementById('agenda'), {
    initOpacity: false,
});
```
- **RefActor** doesn't change its coordinates and sizes.

## Built With
- Vanilla JS
- TypeScript
- webpack

## Authors
- **Nikolay Grishkin** - Initial work - [GitHub](https://github.com/drKaramazin)

See also the list of [contributors](https://github.com/drKaramazin/scroll-rise/graphs/contributors) who participated in this project.

## License
This project is licensed under the MIT License - see the [LICENSE](https://github.com/drKaramazin/scroll-rise/blob/master/LICENSE) file for details.
