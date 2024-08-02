<?php
// src/Controller/UserController.php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;

class UserController extends AbstractController
{
    /**
     * @Route("/user", name="user_info", methods={"GET"})
     */
    public function getUserInfo(Request $request): Response
    {
        $user = $this->getUser();

        if (!$user) {
            throw new AccessDeniedException('Access Denied.');
        }

        return $this->json($user);
    }
}
