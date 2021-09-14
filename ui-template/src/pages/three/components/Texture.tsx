import * as THREE from "three";
import "three/examples/js/controls/OrbitControls"
import React, {useEffect,useRef} from "react";

export default ()=>{
  const node = useRef(null);
  const getBox=()=>{
    var textureLoader = new THREE.TextureLoader();
    textureLoader.load('favicon.png', (texture: string)=>{
      const scene = new THREE.Scene();
      const renderer = new THREE.WebGLRenderer();
      var width = window.innerWidth; //窗口宽度
      var height = window.innerHeight; //窗口高度
      var k = width / height; //窗口宽高比
      var s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
      //创建相机对象
      var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
      renderer.setSize( window.innerWidth, window.innerHeight );
      node.current.appendChild( renderer.domElement );
      const geometry = new THREE.SphereGeometry(60, 25, 25)
      // const material = new THREE.MeshBasicMaterial( { color: 0xffff00,map:'' } );
      var ImageLoader = new THREE.ImageLoader();
// load方法回调函数，按照路径加载图片，返回一个html的元素img对象
      ImageLoader.load('wzjun.jpg', function(img: any) {
        // image对象作为参数，创建一个纹理对象Texture
        var texture = new THREE.Texture(img);
        // 下次使用纹理时触发更新
        texture.needsUpdate = true;
        var material = new THREE.MeshLambertMaterial({
          map: texture, //设置纹理贴图
        });
        var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
        // 平行光
        var directionalLight = new THREE.AmbientLight(0xffffff);
// 设置光源的方向：通过光源position属性和目标指向对象的position属性计算
        directionalLight.position.set(100,100, 100);
// 方向光指向对象网格模型mesh2，可以不设置，默认的位置是0,0,0
        directionalLight.target = mesh;
        scene.add(mesh,directionalLight); //网格模型添加到场景中
        var controls = new THREE.OrbitControls(camera,renderer.domElement);//创建控件对象
        controls.addEventListener('change', render);
        camera.position.set(0, 0, 200); //设置相机位置
        camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
        renderer.setClearColor(0xb9d3ff, 1);
        var axisHelper = new THREE.AxisHelper(250);
        scene.add(axisHelper);
        renderer.render( scene, camera );
        function render() {
          renderer.render(scene,camera);//执行渲染操作
        }

      });

      //纹理贴图加载成功后，调用渲染函数执行渲染操作
      // render();
    })

  }
  useEffect(()=>{
    getBox();

  },[])
  return(
    <>
      <div ref={node}></div>
    </>
  )
}
