const createPosts = (state, elements, i18next) => {
	const postList = state.rss.posts;
	if(postList.length === 0) {
		return;
	}
	const posts = document.createElement('div');
	posts.classList.add('card', 'border-0');
	const cardBody = document.createElement('div');
	posts.append(cardBody);
	cardBody.classList.add('card-body');
	const header = document.createElement('h2');
	cardBody.append(header);
	header.classList.add('card-title', 'h4');
	header.textContent = i18next.t('posts.title');
	const list = document.createElement('ul');
	cardBody.append(list);
	list.classList.add('list-group', 'border-0', 'rounded-0');
	postList.forEach((el) => {
		const post = document.createElement('li');
		post.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
		const a = document.createElement('a');
		post.append(a);
		a.href = el.link;
		a.setAttribute('target', '_blank');
		a.classList.add('fw-bold');
		a.setAttribute('data-id', el.id);
		a.setAttribute('rel', 'noopener');
		a.setAttribute('rel', 'noreffer');
		a.textContent = el.title;
		const button = document.createElement('button');
		post.append(button);
		button.setAttribute('type', 'button');
		button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
		button.setAttribute('data-id', el.id);
		button.setAttribute('data-bs-toggle', 'modal');
		button.setAttribute('data-bs-target', '#modal');
		button.textContent = i18next.t('posts.button');
		list.append(post);
	});
	console.log(elements.posts);
	elements.posts.append(posts);
};

const render = (state, elements, i18next) => {
	const input = elements.input;
	const statusMessage = elements.statusMessage;
	input.classList.remove('is-invalid');
	statusMessage.classList.remove('text-danger');
	if (state.form.isValid === false) {
		input.classList.add('is-invalid');
	} else {
		input.value = '';
	}
	switch (state.form.statusMessage) {
	case true:
		statusMessage.classList.add('text-success');
		statusMessage.textContent = i18next.t('rssStatusMessage.success');
		break;
	case 'inputUrl must be a valid URL':
		statusMessage.classList.add('text-danger');
		statusMessage.textContent = i18next.t('rssStatusMessage.notUrl');
		break;
	case 'inputUrl must not be one of the following values':
		statusMessage.classList.add('text-danger');
		statusMessage.textContent = i18next.t('rssStatusMessage.alreadyExists');
		break;
	case 'No available RSS':
		statusMessage.classList.add('text-danger');
		statusMessage.textContent = i18next.t('rssStatusMessage.noAvailableRss');
		break;
	default:
		throw new Error('Unexpeted status message type');
	}
	createPosts(state, elements, i18next);
};

export default render;