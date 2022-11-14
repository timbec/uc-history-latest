wp.blocks.registerBlockType("ucblocktheme/postlistall", {
    title: "All Posts",
    edit: function () {
        return wp.element.createElement("div", { className: "allposts-placeholder-block" }, "All Posts Placeholder")
    },
    save: function () {
        return null
    }
})