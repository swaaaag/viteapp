<template>
    <div id="three"></div>
</template>

<script setup>
//引入threejs
import * as THREE from 'three' 
//引入轨道控制器（用来通过鼠标事件控制模型旋转、缩放、移动），没有这个需求可不引入
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
//创建一个三维场景
  const scene = new THREE.Scene()
  
  //添加光源
  const ambient = new THREE.AmbientLight(0xffffff, 0.5),
  light1 = new THREE.PointLight(0xffffff, 0.4),
  light2 = new THREE.PointLight(0xffffff, 0.4)

  scene.add(ambient)
  light1.position.set(200,300,400)
  scene.add(light1)
  light2.position.set(-200,-300,-400)
  scene.add(light2)

  //创建一个透视相机
  const width = window.innerWidth, height = window.innerHeight  ,
  camera = new THREE.PerspectiveCamera(45, width/height, 1, 1000)
  //设置相机位置
  camera.position.set(200,200,200) 
  //设置相机方向
  camera.lookAt(0,0,0)
  //创建辅助坐标轴
  const axesHelper = new THREE.AxesHelper(100)
  scene.add(axesHelper)
  //创建一个物体（形状）
  const geometry = new THREE.BoxGeometry(100, 100, 100)
  //创建材质（外观）
  const material = new THREE.MeshLambertMaterial({
    color: 0x00ffff,//设置材质颜色
    transparent: true,//开启透明度
    opacity: 0.5 //设置透明度
  })
  //创建一个网格模型对象
  const mesh = new THREE.Mesh(geometry, material)
  //把网格模型添加到三维场景
  scene.add(mesh)
  //创建一个WebGL渲染器
  const renderer = new THREE.WebGLRenderer()
  renderer.setSize(width,height)
  renderer.render(scene,camera)
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.addEventListener('change',()=>{
    renderer.render(scene, camera)
  })
  onMounted(()=>{
    document.getElementById('three')?.appendChild(renderer.domElement)
  })


</script>

<style lang="scss">
body{
    margin: 0;
    padding: 0;
  }

</style>