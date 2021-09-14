import * as THREE from "three";
import "three/examples/js/controls/OrbitControls"
import React, {useEffect,useRef} from "react";
import Vectornormal from "@/pages/three/components/Vectornormal";
import Texture1 from "@/pages/three/components/Texture1";

export default()=>{
  const node = useRef(null);
  const node1 = useRef(null);
  const node2 = useRef(null);
  const node3 = useRef(null);
  const getBox=()=>{
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    node.current.appendChild( renderer.domElement );
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    const cube = new THREE.Mesh( geometry, material );
    scene.add( cube );
    camera.position.z = 5;
    const animate = function () {
      requestAnimationFrame( animate );
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render( scene, camera );
    };
    animate();
  }
  const getLine=()=>{
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    node1.current.appendChild( renderer.domElement );

    const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
    camera.position.set( 0, 0, 100 );
    camera.lookAt( 0, 0, 0 );

    const scene = new THREE.Scene();
    //create a blue LineBasicMaterial
    const material = new THREE.LineDashedMaterial( { color: 0x0000ff } );
    const points = [];
    points.push( new THREE.Vector3( - 10, 0, 0 ) );
    points.push( new THREE.Vector3( 0, 10, 0 ) );
    points.push( new THREE.Vector3( 10, 0, 0 ) );

    const geometry = new THREE.BufferGeometry().setFromPoints( points );
    const line = new THREE.Line( geometry, material );
    scene.add( line );
    renderer.render( scene, camera );
  }
  const getBoxs=()=>{
    /**
     * 创建场景对象Scene
     */
    var scene = new THREE.Scene();
    /**
     * 创建网格模型
     */
      // var geometry = new THREE.SphereGeometry(60, 40, 40); //创建一个球体几何对象
    var geometry = new THREE.BoxGeometry(100, 100, 100); //创建一个立方体几何对象Geometry
    var material = new THREE.MeshPhongMaterial({
      color:0x0000ff,
      specular:0x4488ee,
      shininess:12
    }); //材质对象Material
    var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
    scene.add(mesh); //网格模型添加到场景中
    var geometry1 = new THREE.SphereGeometry(100, 100, 100); //创建一个立方体几何对象Geometry
    var material1 = new THREE.MeshLambertMaterial({
      color:0xff0000,
      opacity:1,
      transparent:true
    }); //材质对象Material
    var mesh1 = new THREE.Mesh(geometry1, material1); //网格模型对象Mesh
    mesh1.translateY(180);
    scene.add(mesh1); //网格模型添加到场景中
    var geometry2 = new THREE.CylinderGeometry(50, 50, 100, 25); //创建一个立方体几何对象Geometry
    var material2 = new THREE.MeshLambertMaterial({
      color: 0x0000ff
    }); //材质对象Material
    var mesh2 = new THREE.Mesh(geometry2, material2); //网格模型对象Mesh
    mesh2.position.set(180,0,0);
    scene.add(mesh2); //网格模型添加到场景中
    /**
     * 光源设置
     */
      //点光源
    var point = new THREE.PointLight(0xffffff);
    point.position.set(200, 300, 400); //点光源位置
    scene.add(point); //点光源添加到场景中
    //环境光
    var ambient = new THREE.AmbientLight(0x444444);
    scene.add(ambient);
    // console.log(scene)
    // console.log(scene.children)
    /**
     * 相机设置
     */
    var width = window.innerWidth; //窗口宽度
    var height = window.innerHeight; //窗口高度
    var k = width / height; //窗口宽高比
    var s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
    //创建相机对象
    var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
    camera.position.set(200, 300, 200); //设置相机位置
    camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
    // 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
    var axisHelper = new THREE.AxisHelper(250);
    scene.add(axisHelper);
    /**
     * 创建渲染器对象
     */
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);//设置渲染区域尺寸
    renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
    var controls = new THREE.OrbitControls(camera,renderer.domElement);//创建控件对象
    controls.addEventListener('change', render);
    node2.current.appendChild(renderer.domElement); //body元素中插入canvas对象
    //执行渲染操作   指定场景、相机作为参数
    renderer.render(scene, camera);
    function render() {
      renderer.render(scene,camera);//执行渲染操作
    }

  }
  //顶点位置数据解析
  const getPoint=()=>{
    /**
     * 创建场景对象Scene
     */
    var scene = new THREE.Scene();
    var geometry = new THREE.BufferGeometry(); //创建一个Buffer类型几何体对象
    //类型数组创建顶点数据
    var vertices = new Float32Array([
      0, 0, 0, //顶点1坐标
      50, 0, 0, //顶点2坐标
      0, 100, 0, //顶点3坐标
      0, 0, 0, //顶点4坐标
      0, 0, 100, //顶点5坐标
      50, 0, 0, //顶点6坐标
    ]);
   // 创建属性缓冲区对象
    var attribue = new THREE.BufferAttribute(vertices, 3); //3个为一组，表示一个顶点的xyz坐标
   // 设置几何体attributes属性的位置属性
    geometry.attributes.position = attribue;
    //顶点颜色
    var colors=new Float32Array([  1, 0, 0, //顶点1颜色
      0, 1, 0, //顶点2颜色
      0, 0, 1, //顶点3颜色
      1, 1, 0, //顶点4颜色
      0, 1, 1, //顶点5颜色
      1, 0, 1,]) //顶点6颜色
    geometry.attributes.color = new THREE.BufferAttribute(colors, 3);
    //顶点法向量
    var normals = new Float32Array([
      0, 0, 1, //顶点1法向量
      0, 0, 1, //顶点2法向量
      0, 0, 1, //顶点3法向量

      0, 1, 0, //顶点4法向量
      0, 1, 0, //顶点5法向量
      0, 1, 0, //顶点6法向量
    ]);
// 设置几何体attributes属性的位置normal属性
    geometry.attributes.normal = new THREE.BufferAttribute(normals, 3);
    var material = new THREE.MeshBasicMaterial({
      vertexColors: THREE.VertexColors, //三角面颜色
      side: THREE.DoubleSide //两面可见
    }); //材质对象; //材质对象Material
    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    //点模型
    var material1 = new THREE.PointsMaterial({
      vertexColors: THREE.VertexColors,
      size: 10.0 //点对象像素尺寸
    }); //材质对象
    var points = new THREE.Points(geometry, material1); //点模型对象
    scene.add(points);
    //线模型
    var material2=new THREE.LineBasicMaterial({
      color:0xff0000 //线条颜色
    });//材质对象
    var line=new THREE.Line(geometry,material2);//线条模型对象
    scene.add(line);//线条对象添加到场景中
    /**
     * 相机设置
     */
    var width = window.innerWidth; //窗口宽度
    var height = window.innerHeight; //窗口高度
    var k = width / height; //窗口宽高比
    var s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
    //创建相机对象
    var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
    camera.position.set(200, 300, 200); //设置相机位置
    camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
    // 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
    var axisHelper = new THREE.AxisHelper(250);
    scene.add(axisHelper);
    /**
     * 创建渲染器对象
     */
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);//设置渲染区域尺寸
    renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
    node3.current.appendChild(renderer.domElement); //body元素中插入canvas对象
    var controls = new THREE.OrbitControls(camera,renderer.domElement);//创建控件对象
    controls.addEventListener('change', render);
    //执行渲染操作   指定场景、相机作为参数
    renderer.render(scene, camera);
    function render() {
      renderer.render(scene,camera);//执行渲染操作
    }
  }
  useEffect(()=>{
     // getBox();
     // getLine();
     // getBoxs();
     // getPoint();

  },[])
  return(
    <>
      <div ref={node}></div>
      <div ref={node1}></div>
      <div ref={node2}></div>
      <div ref={node3}></div>
      {/*<Vectornormal/>*/}
      {/*<Texture/>*/}
      <Texture1/>
      </>
  )
}
