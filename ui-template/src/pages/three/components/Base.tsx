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
