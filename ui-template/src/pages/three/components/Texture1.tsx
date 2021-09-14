import * as THREE from "three";
import "three/examples/js/controls/OrbitControls"
import React, {useEffect,useRef} from "react";

export default ()=>{
  const node = useRef(null);
  const getBox=()=>{
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
    var controls = new THREE.OrbitControls(camera,renderer.domElement);//创建控件对象
    controls.addEventListener('change', render);
    camera.position.set(0, 0, 200); //设置相机位置
    camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
    renderer.setClearColor(0xb9d3ff, 1);
    var axisHelper = new THREE.AxisHelper(250);
    scene.add(axisHelper);
    var geometry = new THREE.BoxGeometry(100, 100, 100); //立方体
// var geometry = new THREE.PlaneGeometry(204, 102, 4, 4); //矩形平面
// var geometry = new THREE.SphereGeometry(60, 25, 25); //球体
// var geometry = new THREE.CylinderGeometry(60, 60, 25,25); //圆柱
//
// 材质对象1
    var material_1 = new THREE.MeshPhongMaterial({
      color: 0xffff3f
    })
    var textureLoader = new THREE.TextureLoader(); // 纹理加载器
    var texture = textureLoader.load('earth.jpg'); // 加载图片，返回Texture对象
// 材质对象2
    var material_2 = new THREE.MeshLambertMaterial({
      map: texture, // 设置纹理贴图
      // wireframe:true,
    });
// 设置材质数组
    var materialArr = [material_2, material_2, material_2, material_2, material_2, material_2];

// 设置数组材质对象作为网格模型材质参数
    var mesh = new THREE.Mesh(geometry, materialArr); //网格模型对象Mesh
    // 平行光
    var directionalLight = new THREE.AmbientLight(0xffffff);
// 设置光源的方向：通过光源position属性和目标指向对象的position属性计算
    directionalLight.position.set(100,100, 100);
// 方向光指向对象网格模型mesh2，可以不设置，默认的位置是0,0,0
    directionalLight.target = mesh;
    // geometry.faces[4].materialIndex = 1;
    // geometry.faces[5].materialIndex = 1;
    //
// 你可以测试BoxGeometry、PlaneGeometry、CylinderGeometry三角形面的材质索引
// 查看face3对象的materialIndex属性
//     geometry.faces.forEach(elem => {
//       console.log(elem.materialIndex);
//     });
    var geometry = new THREE.PlaneGeometry(204, 102, 4, 4); //矩形平面
// 材质对象1
    var material1 = new THREE.MeshPhongMaterial({
      color: 0xffff3f,
      // wireframe:true,
    })
// 材质对象2
    var material2 = new THREE.MeshPhongMaterial({
      color: 0x0000ff,
      // wireframe:true,
    }); //材质对象Material
// 数组材质
    var materialArr = [material1, material2];
    console.log(geometry.face)
// 设置几何体的材质索引(对于PlaneGeometry而言所有Face3的材质索引默认0)
//     geometry.faces[1].materialIndex = 1;
//     geometry.faces[2].materialIndex = 1;
    var mesh = new THREE.Mesh(geometry, materialArr);
    scene.add(mesh,directionalLight); //网格模型添加到场景中
    renderer.render( scene, camera );
    function render() {
      renderer.render(scene,camera);//执行渲染操作
    }
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
