
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
 * 判断子元素类型
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

	let oldStart = 0;
	let oldEnd = oldChild.length > 0 ? oldChild.length - 1 : 0;
	let newStart = 0;
	let newEnd = newChild.length > 0 ? newChild.length - 1 : 0;

	let oldStartNode = oldChild[oldStart];
	let oldEndNode = oldChild[oldEnd];
	let newStartNode = newChild[newStart];
	let newEndNode = newChild[newEnd];

	let seachKeyNode = [];

	if (!isArray(oldChild) || !isArray(newChild)) {

		if (oldChild !== newChild) {
			changeQueue.push({
				type: 'TEXT',
				node: oldEle.node,
				text: newChild,
			})

      oldEle.children = newEle.children;
		}
	} else {


		if (oldChild.length > 0 && newChild.length > 0) {

			while(oldStart <= oldEnd && newStart <= newEnd) {
				oldStartNode = oldChild[oldStart];
				oldEndNode = oldChild[oldEnd];
				newStartNode = newChild[newStart];
				newEndNode = newChild[newEnd];

				// 匹配原	则
				// oldStart and newStart
				// oldEnd and newEnd
				// oldStart and newEnd
				// oldEnd and newStart

				console.log('算法比较子节点开始')

				

					if (diffSame(oldStartNode, newStartNode)) {
						console.log('--------首1 vs 首2 匹配成功')

						if (oldStart !== newStart) {
							console.log('--------首1 vs 首2 匹配成功 而且需要移动')
						}

						diffChild(oldStartNode, newStartNode, changeQueue);

            if (oldStartNode.position || oldStartNode.position == 0) {
              oldStartNode.position = newStartNode.position;
            }
						oldStart++
						newStart++

					} else if(diffSame(oldEndNode, newEndNode)) {

						diffChild(oldEndNode, newEndNode, changeQueue);
						oldEnd--
						newEnd--

            if (oldEndNode.position || oldEndNode.position == 0) {
              oldEndNode.position = newEndNode.position;
            }

						console.log('--------进行 尾1 vs 尾2 匹配成功',oldEnd,newEnd)
					} else if (diffSame(oldStartNode, newEndNode)) {

						changeQueue.push({
							type: 'MOVE_NODE',
							moveType: 'after',
							moveNode: oldStartNode,
							'匹配元素': newEndNode,
							moveTo: oldEndNode,
							parentNode: oldStartNode.parentNode,
						})

            if (oldStartNode.position || oldStartNode.position == 0) {
              oldStartNode.position = newEndNode.position;
            }
						diffChild(oldStartNode, newEndNode, changeQueue);
						oldStart++
						newEnd--

						
						console.log('--------进行 首1 vs 尾2 匹配成功')

					} else if (diffSame(oldEndNode, newStartNode)) {

						changeQueue.push({
							type: 'MOVE_NODE',
							moveType: 'before',
							moveNode: oldEndNode,
							'匹配元素': newStartNode,
							moveTo: oldStartNode,
							parentNode: oldEndNode.parentNode,
						})

            if (oldEndNode.position || oldEndNode.position == 0) {
              oldEndNode.position = newStartNode.position;
            }
						diffChild(oldEndNode, newStartNode, changeQueue);

						oldEnd--
						newStart++
						console.log('--------进行 尾1 vs 首2 匹配成功')
						
					} else {
						

						if (newStartNode.props.key || newStartNode.props.key == 0) {
							console.log('--------进行 找key 匹配成功')
							let isHasNode = 0;

							oldChild.forEach((v, i) => {

								if (v.props.key === newStartNode.props.key) {
									seachKeyNode.push(v.props.key);

									changeQueue.push({
										type: 'MOVE_NODE',
										moveType: 'before',
										typeSecond: '找key匹配得到',
										moveNode: v,
										moveTo: oldStartNode,
										parentNode: oldEndNode.parentNode,
									});

                  if (v.position || v.position == 0) {
                    oldChild[i].position = newStartNode.position;
                  }

									diffChild(v, newStartNode, changeQueue);
									newStart++;
									isHasNode = 1;

								}
							});

							if (isHasNode == 0) {

								changeQueue.push({
									type: 'ADD',
									addNode: newStartNode,
									addTo: oldStartNode,
                  addType: '未找到匹配的key元素',
									parentNode: oldStartNode.parentNode,
								})

                newStartNode.parentNode = oldStartNode.parentNode;

                oldEle.children.splice(oldStartNode.position, 0, newStartNode);
								console.log('--------未找到匹配的key元素 需要添加元素！！！')
								newStart++

							}

							

							
						} else {
							changeQueue.push({
								type: 'ADD',
								addNode: newStartNode,
								addTo: oldStartNode,
								parentNode: oldStartNode.parentNode,
							})
							console.log('--------未找到元素 需要添加元素！！！')
							newStart++
						}

					}

			}

			if (oldStart > oldEnd) {
				// 新增

				for(let i=newStart; i<=newEnd; i++) {
					changeQueue.push({
						type: 'ADD',
						addType: 'before',
						addNode: newChild[i],
						addTo: oldStartNode,
						parentNode: oldEndNode.parentNode,
					})

          newChild[i].parentNode = oldEle.node;

          oldEle.children.push(newChild[i]);

				}



				
			}

			if (newStart > newEnd) {
				// 删除

				for(let i=oldStart; i<=oldEnd; i++) {
					
					let key = oldChild[i].props.key;

					if (!seachKeyNode.includes(key)) {
						changeQueue.push({
							type: 'DELECT',
							delectNode: oldChild[i],
							parentNode: oldEndNode.parentNode,
						});

            oldEle.children.splice(i, 1);

					}

				}
			}


      // 更新旧DOM树
      oldEle.children = oldEle.children.sort(sortVote);



		} else if (oldChild.length > 0) {
			console.log('删除元素');

      for(let i=0; i<oldChild.length; i++) {
          
          changeQueue.push({
            type: 'DELECT',
            delectNode: oldChild[i],
            parentNode: oldEndNode.parentNode,
          });

          oldEle.children.splice(i, 1);

      }

		} else if (newChild.length > 0) {
			console.log('新增元素');

			newChild.forEach((newItem, i) => {

        changeQueue.push({
          type: 'ADD',
          addNode: newChild[i],
          parentNode: oldEle.node,
          addType: '旧DOM树为空',
        });

        newChild[i].parentNode = oldEle.node;
        oldEle.children.push(newChild[i]);

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
	console.log('diff开始',oldEle, newEle)

	// 第一层 深度遍历优先
	let changeQueue = []; // 更新队列

	if (newEle == null) {
		
	} else if (!isArray(oldEle.children) && !isArray(newEle.children)) {
		// 若为文本

		// if (oldEle !== newEle) {
		// 	changeQueue.push({ type: 'TEXT', data: {
		// 		text: newEle,
		// 		node: oldEle.node
		// 	} })
		// }
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

	return { changeQueue: changeQueue, oldEle: oldEle };

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
				// v.parentNode.insertBefore(v.addNode.node, v.addTo.node);
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
          $(v.moveNode.node).insertAfter(v.moveTo.node)
        } else {
          v.parentNode.insertBefore(v.moveNode.node, v.moveTo.node);
        }
				break;

		}

	})

}