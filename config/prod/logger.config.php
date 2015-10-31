<?php
/**
 * Конфиг логов.
 * @author Andrey Mostovoy <stalk.4.me@gmail.com>
 */
use Monolog\Formatter\LogstashFormatter;
use Monolog\Logger;

return [
    'handlers' => [
        'uberlog' => [
            'level'             => Logger::INFO,
            'source_program'    => 'quiz',
            'source_host'       => MESOS_HOST ?: APPLICATION_SERVER,
            'formatter'         => LogstashFormatter::class,
        ],
    ],
];
