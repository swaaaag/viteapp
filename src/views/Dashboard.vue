<template>

   <el-header class="nav-box mgb20">
      <div class="nav-title">控制面板</div>
      <el-button class="refresh" type="info" plain @click="refresh">刷新</el-button>
    </el-header> 

    <el-main class="main-box" >
      <div class="card-box mgb30">
        <el-card shadow="hover" v-for="(item,index) in summanyList" :key="index" class="card" :style="{ background: item.color }">
          <template #header>
            <div class="card-header">
              <span>{{ item.StatName }}</span>
            </div>
          </template>
          <div class="card-status">
            <span v-for="(row,index) in item.StatRow" :key="index">{{ row.TargetName }} ({{row.TargetCount}})</span>
          </div>
        </el-card>
      </div>
    </el-main>

</template>

<script setup name="dashboard">
import { dashApi } from '@/api/modules/dashboard';

const summanyList = ref([]);

const getPanelTotal = () => {
  dashApi.getPanelTotal().then(res => {
    summanyList.value = res.Data;
    summanyList.value[0].color = 'rgb(247 185 82)';
    summanyList.value[1].color = 'rgb(113 133 227)';
    summanyList.value[2].color = 'rgb(249 118 69)';
    summanyList.value[3].color = 'rgb(87 183 121)';
    if(summanyList.value[4]){
      summanyList.value[4].color = 'rgb(113 133 227)';
    }
  });
}

getPanelTotal();

//刷新页面
const refresh = () => {
    window.location.reload();
}

</script>

<style lang="scss" >

.mgb30 {
  margin-bottom: 30px;
}
.nav-box{ 
    height: 70px;
    background-color: #fff;
    .nav-title{
        float: left;
        font-size: 1.5em;
        color: gray;
        margin: 15px;
    }
    .refresh{ 
        float: right;
        margin: 15px;
        font-size: 1em;
    }
}

.main-box{
    
    background-color: #fff;
    padding: 20px;
    .card-box{  
      display: flex;
      justify-content: space-around;
      .card{ 
        cursor: pointer;
        width: 300px;
        height: 180px;
        margin: 10px;
        border-radius: 10px;
        color: #fff;
        .card-header{
          height: 20px;
          line-height: 20px;
          font-size: 1em;
        }
        .el-card__body {
          padding: 20px 10px;
          .card-status{
          height: 40px;
          line-height: 40px;
          font-size: 1.2em;
          display: flex;
          justify-content: space-around;
        }
        }
        
      }
    }

     .chart-left {
      height: 300px;
      display: flex;
      .chart-bar {
        width: 100%;
        height: 100%;
      }
    }
    .chart-right {
      height: 300px;
      display: flex;
      .chart-bar {
        width: 100%;
        height: 100%;
      }
    }
}

</style>