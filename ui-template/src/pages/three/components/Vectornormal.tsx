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
      const geometry = new THREE.BoxGeometry(100,100,100)
      const material = new THREE.MeshBasicMaterial( { color: 0xffff00, } );
      const cube = new THREE.Mesh( geometry, material );
      //scene.add( cube );

      //不使用顶点索引
      const autoGeometry=new THREE.BufferGeometry();
      //类型数组创建顶点位置position数据
      var vertices = new Float32Array([
        0, 0, 0, //顶点1坐标
        80, 0, 0, //顶点2坐标
        80, 80, 0, //顶点3坐标

        0, 0, 0, //顶点4坐标   和顶点1位置相同
        80, 80, 0, //顶点5坐标  和顶点3位置相同
        0, 80, 0, //顶点6坐标
      ]);
      var attribue = new THREE.BufferAttribute(vertices, 3); //3个为一组
      autoGeometry.attributes.position = attribue
      var normals = new Float32Array([
        1, 0, 0, //顶点1法向量
        1, 0, 0, //顶点2法向量
        1, 0, 0, //顶点3法向量

        0, 0, 1, //顶点4法向量
        0, 0, 1, //顶点5法向量
        0, 0, 1, //顶点6法向量
      ]);
      autoGeometry.attributes.normal = new THREE.BufferAttribute(normals, 3);
      const material1 = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
      const mesh1 = new THREE.Mesh( autoGeometry, material1 );
      // scene.add( mesh1 );

      //使用顶点索引
      var autoGeometry1 = new THREE.BufferGeometry(); //声明一个空几何体对象
//类型数组创建顶点位置position数据
      var vertices = new Float32Array([
        0, 0, 0, //顶点1坐标
        80, 0, 0, //顶点2坐标
        80, 80, 0, //顶点3坐标
        0, 80, 0, //顶点4坐标
      ]);
// 创建属性缓冲区对象
      var attribue = new THREE.BufferAttribute(vertices, 3); //3个为一组
// 设置几何体attributes属性的位置position属性
      autoGeometry1.attributes.position = attribue
      var normals = new Float32Array([
        1, 0, 0, //顶点1法向量
        1, 0, 0, //顶点2法向量
        1, 0, 0, //顶点3法向量
        1, 0, 0, //顶点4法向量
      ]);
// 设置几何体attributes属性的位置normal属性
      autoGeometry1.attributes.normal = new THREE.BufferAttribute(normals, 3);
      var indexes = new Uint16Array([
        // 0对应第1个顶点位置数据、第1个顶点法向量数据
        // 1对应第2个顶点位置数据、第2个顶点法向量数据
        // 索引值3个为一组，表示一个三角形的3个顶点
        0, 1, 2,
        0, 2, 3,
      ])
      autoGeometry1.index = new THREE.BufferAttribute(indexes, 1);
      const material2 = new THREE.MeshLambertMaterial( { map: texture } );
      const mesh2 = new THREE.Mesh( autoGeometry1, material2 );


      //   //点光源
      //   var point = new THREE.PointLight(0x000000);
      // //设置点光源位置，改变光源的位置
      //   point.position.set(0, 0, 300);
      //   scene.add(point);

      var geometryP= new THREE.BoxGeometry(100, 100, 100); //创建一个立方体几何对象Geometry
// 点渲染模式
      var materialP = new THREE.MeshLambertMaterial({
        color: 0xff0000,
        map: texture,
      }); //材质对象
      const meshP = new THREE.Mesh( geometryP, materialP );
      meshP.position.set(0, 0, 0);
      scene.add(meshP)
      // 环境光
      var directionalLight = new THREE.DirectionalLight(0xffff00, 1);
// 设置光源的方向：通过光源position属性和目标指向对象的position属性计算
      directionalLight.position.set(0,0, 100);
// 方向光指向对象网格模型mesh2，可以不设置，默认的位置是0,0,0
      directionalLight.target = mesh2;
      scene.add(directionalLight);


// // 聚光光源
//     var spotLight = new THREE.SpotLight(0xffffff);
// // 设置聚光光源位置
//     spotLight.position.set(300, 300, 400);
// // 设置聚光光源发散角度
//     spotLight.angle = Math.PI /6
//
// // 设置用于计算阴影的光源对象
//     spotLight.castShadow = true;
// // 设置计算阴影的区域，注意包裹对象的周围
//     spotLight.shadow.camera.near = 1;
//     spotLight.shadow.camera.far = 300;
//     spotLight.shadow.camera.fov = 20;
//     scene.add( spotLight );
      mesh2.scale.set(0.5, 1.5, 2)
      mesh2.position.y = 80;
//     var axis = new THREE.Vector3(1, 1, 1);
//     axis.normalize(); //向量归一化
// //沿着axis轴表示方向平移100
//     mesh2.translateOnAxis(axis, 100);
      var axis = new THREE.Vector3(0,1,0);//向量axis
      mesh2.rotateOnAxis(axis,Math.PI/8);//绕axis轴旋转π/8
      var mesh3 = mesh2.clone();//克隆网格模型
      mesh3.translateX(300);//网格模型mesh平移
      // mesh2.rotateX(Math.PI/4);

      // 声明一个三维向量用来保存世界坐标
      var worldPosition = new THREE.Vector3();
// 执行getWorldPosition方法把模型的世界坐标保存到参数worldPosition中
      mesh2.getWorldPosition(worldPosition);
      scene.add( mesh2,mesh3 );
      // 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
      var axisHelper = new THREE.AxisHelper(250);
      scene.add(axisHelper);
      var controls = new THREE.OrbitControls(camera,renderer.domElement);//创建控件对象
      controls.addEventListener('change', render);
      camera.position.set(0, 0, 100); //设置相机位置
      camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
      renderer.setClearColor(0xb9d3ff, 1);
      renderer.render( scene, camera );
      function render() {
        renderer.render(scene,camera);//执行渲染操作
      }

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
