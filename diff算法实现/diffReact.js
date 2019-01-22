
/*
 * 创建虚拟DOM元素
 */
function createVDOM(tagName, props, children) {

	let ele = {};

	ele.tagName = tagName;
	ele.props = props;
	ele.children = children === '' ? [] : children;

	return ele;
}

/*
 * 创建虚拟DOM树
 */
function createVDOMTree(tree) {

	let ele = document.createElement(tree.tagName);
	tree.node = ele;
	tree.props = tree.props;

	for(key in tree.props) {
		ele.setAttribute(key, tree.props[key]);
	}

	if (!isArray(tree.children)) {
		let child = document.createTextNode(tree.children);
		tree.children.node = child;
		ele.appendChild(child);
	} else {

		tree.children.forEach((v, i) => {
			let child = {};
			tree.children[i].parentNode = tree.node;

			if (typeof v === "object") {
				tree.children[i].position = i;
				child = createVDOMTree(v).node;

				tree.children[i].node = child;
			} else {

				child = document.createTextNode(v);
				tree.children[i].position = i;
				tree.children[i].node = child;
				
			}

			ele.appendChild(child);
		});

	}

	return tree;
}

/*
 * 判断字符串类型
 */
function isArray(tree) {

	// 第一层 深度遍历优先
	return tree instanceof Array;
}

/*
 * diff 子元素
 */
function diffChild(oldEle, newEle, changeQueue) {
	
	let oldChild = oldEle.children;
	let newChild = newEle.children;

	console.log('比较子节点开始',oldChild,newChild);

	// 当前访问元素在旧DOM树中的位置
	let lastIndex = 0;
	let mapNode = [];
	let addNodeArray = [];

	// 子元素为string类型
	if (!isArray(oldChild) || !isArray(newChild)) {

		if (oldChild !== newChild) {
			// 修改真实dom树
			changeQueue.push({
				type: 'TEXT',
				node: oldEle.node,
				text: newChild,
			})

			// 修改虚拟dom树
			oldEle.children = newEle.children;
		}
	} else {

		let afterNode = null;

		if (oldChild.length > 0 && newChild.length > 0) {

			newChild.forEach((newItem, newIndex) => {

				// newChildFindIndex: 新元素是否在旧DOM树中找到位置, afterNode: 上一个元素
				let newChildFindIndex = -1;
				let currentChild = null;
				for (let i=0; i < oldChild.length; i++) {

					if (mapNode.indexOf(oldChild[i].props.key) == -1) {

						// 若在旧DOM中匹配到元素 则记录下当前匹配元素在旧DOM树中的位置
						if (diffSame(newItem, oldChild[i])) {

							console.log('匹配成功')
							newChildFindIndex = i;
							currentChild = oldChild[i];
							mapNode.push(oldChild[i].props.key);
							oldEle.children[i].position = newIndex;
							lastIndex = Math.max(i,lastIndex);
							break;
						} else {
							console.log('匹配未成功')
						}
					}
					
				}


				console.log('计算结果',newChildFindIndex,afterNode,lastIndex)


				if (newChildFindIndex === -1) {
					// 新增元素
					changeQueue.push({
						type: 'ADD',
						addNode: newItem,
						afterNode: afterNode,
						parentNode: oldChild[0].parentNode,
					})

					addNodeArray.push(newItem.props.key)
					newItem.parentNode = oldChild[0].parentNode;
					oldEle.children.push(newItem);

				} else if (newChildFindIndex < lastIndex) {
					// 进行移位操作

					console.log('移位操作==index---------',newChildFindIndex, lastIndex)

					console.log('移位元素index比较', newItem.position, ':::::' ,newChildFindIndex)
					changeQueue.push({
						type: 'MOVE_NODE',
						moveType: newItem.position > newChildFindIndex ? 'after' : 'before',
						moveNode: currentChild,
						'匹配元素': newItem,
						afterNode: afterNode,
						parentNode: currentChild.parentNode,
					})

					diffChild(currentChild, newItem, changeQueue);

				} else {
					// 不需要移位
					diffChild(currentChild, newItem, changeQueue);
				}

				afterNode = currentChild;
			
			})


			oldEle.children = oldEle.children.sort(sortVote);

			oldChild.forEach((v, i) => {

				// 判断是否包含元素
				if ((mapNode.indexOf(v.props.key) == -1) && addNodeArray.indexOf(v.props.key) == -1) {

					changeQueue.push({
						type: 'DELECT',
						delectNode: oldChild[i],
						parentNode: oldChild[i].parentNode,
					});

					oldEle.children.splice(i, 1);

				}

			})

		} else if (newChild.length > 0) {
			// 新增

			newChild.forEach((v, i) => {
				changeQueue.push({
					type: 'ADD',
					addNode: newChild[i],
					parentNode: oldEle.node,
				});

				newChild[i].parentNode = oldEle.node;
				oldEle.children.push(newChild[i]);
			})

		} else if (oldChild.length > 0) {
			// 删除

			oldChild.forEach((v, i) => {
				changeQueue.push({
					type: 'DELECT',
					delectNode: oldChild[i],
					parentNode: oldChild[i].parentNode,
				});

				oldEle.children.splice(i, 1);
			})
		}

		


	}

	console.log('比较字节点结束');
	
}


function sortVote(a, b) {
	return a.position - b.position;
}


/*
 * diff Props
 */
function diffProps(oldProps, newProps) {
	let changeProps = {};

	let i = 0;

	for (key in newProps) {

		if (!oldProps[key]) {
			changeProps[key] = newProps[key];
		}

		if (oldProps[key] !== newProps[key]) {
			changeProps[key] = newProps[key];
		}

		i ++ 
	}

	if (i == 0) {
		return false;
	} else {
		return changeProps;
	}
	
}

/*
 * diff 元素类型
 */
function diffSame(oldEle, newEle) {
	console.log('diffSame',oldEle, newEle)

	let oldChild = oldEle.children;
	let newChild = newEle.children;
	if (newEle == null) {
		
	} else if (!isArray(oldChild) && !isArray(newChild)) {
		// 若为文本
		return true;
	} else if (oldEle && oldEle.tagName === newEle.tagName) {

		if (!oldEle.props.key && oldEle.props.key !== 0) {
			return true;
		}

		if (oldEle.props.key === newEle.props.key) {
			return true;
		} else {
			return false;
		}

	}
	
}

/*
 * diff 入口
 */
function diff(oldEle, newEle) {
	console.log('diff开始',oldEle, newEle,isArray(oldEle.children),isArray(newEle.children))

	// 第一层 深度遍历优先
	let changeQueue = []; // 更新队列

	if (newEle == null) {
		
	} else if (!isArray(oldEle.children) && !isArray(newEle.children)) {
		console.log('都为文本')
		// 若为文本

		if (oldEle.children !== newEle.children) {
			changeQueue.push({ type: 'TEXT', data: {
				text: newEle.children,
				node: oldEle.node
			} })
		}
	} else if (oldEle && oldEle.props.key === newEle.props.key) {

		let diffPropsQueue = diffProps(oldEle.props, newEle.props);
		if (!$.isEmptyObject(diffPropsQueue)) {
			changeQueue.push({ type: 'PROPS', data: {
				props: diffPropsQueue,
				node: oldEle.node,
			} });
		}
		let diffChildQueue = diffChild(oldEle, newEle, changeQueue);


	} else {
		// 替换


	}

	return {changeQueue: changeQueue, oldEle: oldEle};

}


function insertAfter(newElement,targetElement) {
    var parent = targetElement.parentNode;//获取目标节点的父级标签
    if(parent.lastChild == targetElement) {//如果目标节点正好是最后一个节点，使用appendChild插入
        parent.appendChild(newElement);
    } else {

     	//一般情况下要取得目标节点的下一个节点，再使用insertBefore()方法。
    	parent.insertBefore(newElement,targetElement.nextSibling);
	}
}


/*
 * 渲染更新
 */
function render(diffRes) {

	diffRes.forEach((v, i) => {

		switch(v.type) {
			case 'PROPS':
				for(key in v.data.props) {
					if (key == 'style') {
						v.data.node.style = v.data.props.style;
					} else {

						v.data.node.setAttribute(key, v.data.props[key]);
					}
					
				}
				break;
			case 'REPLACE':
				break;
			case 'ADD':
				v.parentNode.appendChild(v.addNode.node);
				break;
			case 'TEXT':
				v.node.innerHTML = v.text;
				break;
			case 'DELECT':
				v.parentNode.removeChild(v.delectNode.node);
				break;
			case 'MOVE_NODE':

				if (v.moveType == 'after') {

					// 将 A 插入到 B 后面
		          $(v.moveNode.node).insertAfter(v.afterNode.node);
		        } else {
		          v.parentNode.insertBefore(v.afterNode.node, v.moveNode.node);
       			}
				break;

		}

	})

}