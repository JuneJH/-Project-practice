<template>
    <div class="studentlist">
        <Search/>
        <ShowList/>
        
     
    </div>
</template>
<script>
import Search from '../components/stuList/search'
import ShowList from '../components/stuList/showList'
export default {
    
    components:{
        Search,
        ShowList,
    }
}
</script>