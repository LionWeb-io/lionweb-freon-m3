export class ListUtil {
    static addIfNotPresent(list, addition) {
        if (!!addition && !list.includes(addition)) {
            list.push(addition);
        }
    }
    static addAllIfNotPresent(list, listOfAdditions) {
        for (const xx of listOfAdditions) {
            ListUtil.addIfNotPresent(list, xx);
        }
    }
}
//# sourceMappingURL=ListUtil.js.map