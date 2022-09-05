<template>
    <div>
        <el-table
            v-loading="loading"
            :data="tableData"
            :border="config.border"
            style="width: 100%"
            :stripe="config.stripe"
            v-bind="childrenProps"
            header-cell-class-name="table-header"
            @selection-change="handleSelectionChange"
        >
            <el-table-column
                v-if="showSelectColumn"
                type="selection"
                align="center"
                width="60"
            />
            <el-table-column
                v-if="showIndexColumn"
                type="index"
                label="序号"
                align="center"
                width="80"
            />
            <template v-for="propItem in columnData" :key="propItem.prop">
                {{ propItem }}
                <el-table-column v-bind="propItem"
                                 :align="propItem.align ? propItem.align:'center'"
                                 :header-align="propItem.headerAlign ? propItem.headerAlign:'center'"
                                 show-overflow-tooltip>
                    <template #default="scope">
                        <slot :name="propItem.slotName" :row="scope.row">
                            {{ scope.row[propItem.prop] }}
                        </slot>
                    </template>
                </el-table-column>
            </template>
        </el-table>
        <div v-if="showFooter" class="footer">
            <slot name="footer">
                <el-pagination
                    :current-page="page.currentPage"
                    :page-size="page.pageSize"
                    :page-sizes="page.pageSizes"
                    layout="->,total, sizes, prev, pager, next, jumper"
                    :total="listCount"
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                />
            </slot>
        </div>
    </div>
</template>

<script setup>
const props = defineProps(
    {
        title: {
            type: String,
            default: ''
        },
        columnData: {
            type: Array,
            required: true
        },
        listCount: {
            type: Number,
            default: 0
        },
        tableData: {
            type: Array,
            required: true
        },
        showIndexColumn: {
            type: Boolean,
            default: false
        },
        showSelectColumn: {
            type: Boolean,
            default: false
        },
        page: {
            type: Object,
            default: () => ({ currentPage: 1, pageSize: 10, pageSizes: [10, 20, 50, 100, 200, 500] })
        },
        childrenProps: {
            type: Object,
            default: () => ({
            })
        },
        showFooter: {
            type: Boolean,
            default: true
        },
        config: {
            type: Object,
            default: () => ({
                border: true,
                stripe: true
            })
        },
        loading: {
            type: Boolean,
            default: false
        }
    }
)
const emit = defineEmits(['selectionChange', 'update:page'])
const handleSelectionChange = value => {
    emit('selectionChange', value)
}

const handleCurrentChange = currentPage => {
    emit('update:page', { ...props.page, currentPage })
}

const handleSizeChange = pageSize => {
    emit('update:page', { ...props.page, pageSize })
}

</script>

<style scoped lang="scss">
// ::v-deep(.el-loading-mask){
//     z-index: 800;
// }
.footer{
    margin-top: 15px;
    overflow-x: auto;
}
</style>
