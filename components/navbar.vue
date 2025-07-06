<template>
    <header class="navbar">
        <nav class="navbar-menu">
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/events">Events</a></li>
                <li><a href="/projects">Projects</a></li>
                <!--<li><a href="/forum">Forum</a></li>
                <li><a href="/blog">Blog</a></li>
            -->
                <li><a href="/join">Join FOSS</a></li>
            </ul>
        </nav>
    </header>
</template>

<style scoped>
    * {
        margin: 0;
        color: var(--color-text-secondary-dark);
    }
    .navbar {
        border-bottom: 1px solid var(--color-divider);
        font-size: 14px;
        font-weight: 500;
        letter-spacing: .5px;
        padding: 16px 200px;
    }
    .navbar-menu ul {
        list-style: none;
        display: flex;
        justify-content: right;
        height: 48px;
        align-items: center;
    }
    .navbar-menu a {
        text-decoration: none;
        padding: 8px 16px;
    }

    .navbar-menu a:hover {
        color: var(--color-text-primary);
    }
</style>