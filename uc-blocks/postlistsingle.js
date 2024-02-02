wp.blocks.registerBlockType("ucblocktheme/postlistsingle", {
    title: "Single Post",
    edit: function () {
        return wp.element.createElement("div", { className: "singleposts-placeholder-block" }, "Single Posts Placeholder")
    },
    save: function () {
        return null
    }
})