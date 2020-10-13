<template>
    <div>
        <div>
            <ve-line :data="lineData"></ve-line>
        </div>
    </div>
</template>

<script>
    import VeLine from 'v-charts/lib/line.common';
    export default {
        name: "Echarts",
        components: {
            VeLine
        },
        data() {
            return {
                lineData: {
                    columns: ['日期', '访问用户', '下单用户'],
                    rows: [
                        {'日期':'2020-09-18', '访问用户': '32371', '下单用户': '19810'},
                        {'日期':'2020-09-17', '访问用户': '22771', '下单用户': '13810'},
                        {'日期':'2020-09-19', '访问用户': '32471', '下单用户': '19410'}
                    ],
                }
            }
        }
    }
</script>

<style scoped>

</style>